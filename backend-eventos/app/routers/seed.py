from fastapi import APIRouter, HTTPException
from sqlmodel import Session, select
from app.models.role import Role
from app.models.user import User
from app.config.database import engine
import uuid
import time

router = APIRouter()

@router.get("/seed")
async def seed_database():
    print("Seeding database...")
    roles = [
        {"name": "user", "permissions": "limit", "role_level": 3, "created_at": int(time.time()), "uuid_rol": uuid.uuid4()},
        {"name": "organization", "permissions": "organization", "role_level": 2, "created_at": int(time.time()), "uuid_rol": uuid.uuid4()},
        {"name": "administrator", "permissions": "fullaccess", "role_level": 1, "created_at": int(time.time()), "uuid_rol": uuid.uuid4()}
    ]

    try:
        with Session(engine) as session:
            for role_data in roles:
                existing_role = session.exec(select(Role).where(Role.name == role_data["name"])).first()
                if not existing_role:
                    role = Role(**role_data)
                    session.add(role)
            session.commit()

            # Crear usuario administrador
            admin_role = session.exec(select(Role).where(Role.name == "administrator")).first()
            if admin_role:
                admin_user = User(
                    name="admin",
                    last_name="admin",
                    email="admin@miseventos.com",
                    password="eventos2025",
                    uuid_role=admin_role.uuid_rol
                )
                admin_user.set_password(admin_user.password)
                session.add(admin_user)
                session.commit()

        return {"message": "Database seeded successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error seeding database: {e}")
