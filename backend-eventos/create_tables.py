from sqlmodel import SQLModel
from app.config.database import engine
from app.models.user import User
from app.models.role import Role
from app.models.event import Event
from app.models.user import UserEventLink

# Crea todas las tablas
def create_tables():
    SQLModel.metadata.create_all(engine)

if __name__ == "__main__":
    create_tables()
