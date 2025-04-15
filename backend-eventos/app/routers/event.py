from math import e
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.models.event import Event
from app.models.user import User
from app.config.database import get_db
from sqlalchemy.exc import IntegrityError
from typing import List
from fastapi import Depends, HTTPException
from app.routers.auth import get_current_user
from app.config.database import get_db
from sqlalchemy.orm import Session
from pydantic import BaseModel

router = APIRouter()

# Definir la función para obtener el rol del usuario actual
def get_current_user_role(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.uuid_user == current_user).first()
    if user:
        return user.uuid_role
    raise HTTPException(status_code=404, detail="User role not found")

class RegisterUserRequest(BaseModel):
    user_id: str

@router.post("/events/", response_model=Event)
def create_event(event: Event, db: Session = Depends(get_db)):
    try:
        db.add(event)
        db.commit()
        db.refresh(event)
        return event
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Event could not be created.")

@router.get("/events/", response_model=List[Event])
def read_events(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    events = db.query(Event).offset(skip).limit(limit).all()
    return events

@router.get("/events/{event_id}", response_model=Event)
def read_event(event_id: str, db: Session = Depends(get_db)):
    event = db.query(Event).filter(Event.uuid_evento == event_id).first()
    if event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    return event
#hola
@router.put("/events/{event_id}", response_model=Event)
def update_event(event_id: str, updated_event: Event, db: Session = Depends(get_db)):
    event = db.query(Event).filter(Event.uuid_evento == event_id).first()
    if event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    # Excluir el campo uuid_evento de la actualización
    updated_data = updated_event.dict(exclude={"uuid_evento"})
    for key, value in updated_data.items():
        setattr(event, key, value)
    db.commit()
    db.refresh(event)
    return event

@router.delete("/events/{event_id}")
def delete_event(event_id: str, db: Session = Depends(get_db)):
    event = db.query(Event).filter(Event.uuid_evento == event_id).first()
    if event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    # Limpiar usuarios asignados al evento
    event.users.clear()
    db.delete(event)
    db.commit()
    return {"message": "Event and associated users deleted successfully"}

@router.post("/events/{event_id}/register")
def register_user_to_event(event_id: str, request: RegisterUserRequest, db: Session = Depends(get_db)):
    user_id = request.user_id
    event = db.query(Event).filter(Event.uuid_evento == event_id).first()
    user = db.query(User).filter(User.uuid_user == user_id).first()

    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Validar el número de usuarios inscritos
    if len(event.users) >= event.numero_asistentes:
        raise HTTPException(status_code=400, detail="El número de participantes ha alcanzado su límite máximo")

    # Check for time conflicts
    user_events = db.query(Event).join(Event.users).filter(User.uuid_user == user_id).all()
    for ue in user_events:
        if (ue.start_date < event.end_date and event.start_date < ue.end_date):
            raise HTTPException(status_code=400, detail="El usuario ya se encuentra inscrito para un evento que se superpone en el tiempo.")

    event.users.append(user)
    db.commit()
    return {"message": "User registered successfully"}

@router.post("/events/{event_id}/unregister")
def unregister_user_from_event(event_id: str, request: RegisterUserRequest, db: Session = Depends(get_db)):
    user_id = request.user_id
    event = db.query(Event).filter(Event.uuid_evento == event_id).first()
    user = db.query(User).filter(User.uuid_user == user_id).first()

    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user in event.users:
        event.users.remove(user)
        db.commit()
        return {"message": "User unregistered successfully"}
    else:
        raise HTTPException(status_code=400, detail="El usuario no se encuentra inscrito para este evento.")

@router.get("/events/{event_id}/users")
def list_users_for_event(event_id: str, db: Session = Depends(get_db)):
    event = db.query(Event).filter(Event.uuid_evento == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event.users
