from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from ..models.role import Role
from ..config.database import engine
from .auth import get_current_user
from ..models.user import User

router = APIRouter()

# Dependency to get DB session
async def get_session():
    with Session(engine) as session:
        yield session

@router.post("/roles/", response_model=Role, dependencies=[Depends(get_current_user)])
async def create_role(role: Role, session: Session = Depends(get_session)):
    session.add(role)
    session.commit()
    session.refresh(role)
    return role

@router.get("/roles/{role_id}", response_model=Role, dependencies=[Depends(get_current_user)])
async def read_role(role_id: str, session: Session = Depends(get_session)):
    role = session.get(Role, role_id)
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")
    return role

@router.put("/roles/{role_id}", response_model=Role, dependencies=[Depends(get_current_user)])
async def update_role(role_id: str, role: Role, session: Session = Depends(get_session)):
    db_role = session.get(Role, role_id)
    if not db_role:
        raise HTTPException(status_code=404, detail="Role not found")
    db_role.name = role.name
    db_role.permissions = role.permissions
    session.commit()
    session.refresh(db_role)
    return db_role

@router.delete("/roles/{role_id}", response_model=Role, dependencies=[Depends(get_current_user)])
async def delete_role(role_id: str, session: Session = Depends(get_session)):
    role = session.get(Role, role_id)
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")
    session.delete(role)
    session.commit()
    return role

@router.get("/roles/", dependencies=[Depends(get_current_user)])
async def list_roles(session: Session = Depends(get_session), current_user: str = Depends(get_current_user)):
    # Obtener el rol del usuario actual
    print(current_user)
    userNew = session.exec(select(User).where(User.uuid_user == current_user)).first()
    user_role = session.exec(select(Role).where(Role.uuid_rol == userNew.uuid_role)).first()
 
    if user_role and user_role.permissions == "fullaccess":
        # Si el rol tiene permisos de "full access", listar todos los roles
        roles = session.exec(select(Role)).all()
    else:
        # Si no, aplicar restricciones
        roles = session.exec(select(Role).where(Role.name.in_(["user", "organization"]))).all()
    
    return roles
