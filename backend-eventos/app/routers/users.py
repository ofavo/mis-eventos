from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from ..models.user import User
from ..models.role import Role
from ..config.database import engine
from .auth import get_current_user

router = APIRouter()

# Dependency to get DB session
async def get_session():
    with Session(engine) as session:
        yield session

@router.post("/users/", response_model=User, dependencies=[Depends(get_current_user)])
async def create_user(user: User, session: Session = Depends(get_session)):
    user.set_password(user.password)  # Encrypt the password
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

@router.get("/users/{user_id}", response_model=User, dependencies=[Depends(get_current_user)])
async def read_user(user_id: str, session: Session = Depends(get_session)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.get("/users/", response_model=list[User], dependencies=[Depends(get_current_user)])
async def list_users(session: Session = Depends(get_session), current_user: str = Depends(get_current_user)):
    # Obtener el usuario actual
    user = session.exec(select(User).where(User.uuid_user == current_user)).first()
    rol = session.exec(select(Role).where(Role.uuid_rol == user.uuid_role)).first()
    # treaer los id de los roles mayores o iguales a el rol del usuario actual
    roles = session.exec(select(Role).where(Role.role_level >= rol.role_level)).all()
    users = session.exec(select(User).where(User.uuid_role.in_([r.uuid_rol for r in roles]))).all()
    
    return users

@router.put("/users/{user_id}", response_model=User, dependencies=[Depends(get_current_user)])
async def update_user(user_id: str, user: User, session: Session = Depends(get_session)):
    db_user = session.get(User, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    db_user.name = user.name
    db_user.last_name = user.last_name
    db_user.email = user.email
    if user.password:
        db_user.set_password(user.password)
    db_user.uuid_role = user.uuid_role
    session.commit()
    session.refresh(db_user)
    return db_user

@router.delete("/users/{user_id}", response_model=User, dependencies=[Depends(get_current_user)])
async def delete_user(user_id: str, session: Session = Depends(get_session)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    session.delete(user)
    session.commit()
    return user
