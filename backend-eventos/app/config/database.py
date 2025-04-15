from sqlmodel import create_engine, SQLModel
from dotenv import load_dotenv
import os
from sqlalchemy.orm import sessionmaker

load_dotenv()

# Usar una URL de conexión explícita para Docker
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@db:5432/postgres")
engine = create_engine(DATABASE_URL)

Base = SQLModel

# Crear una fábrica de sesiones
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Función para obtener la sesión de base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
