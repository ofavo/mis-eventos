from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Column, String, Integer, DateTime, Table, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime

from app.config.database import Base

class UserEventLink(SQLModel, table=True):
    __tablename__ = 'usereventlink'
    __table_args__ = {'extend_existing': True}
    user_id: uuid.UUID = Field(default=None, foreign_key="user.uuid_user", primary_key=True)
    event_id: uuid.UUID = Field(default=None, foreign_key="event.uuid_evento", primary_key=True)

class Event(SQLModel, table=True):
    uuid_evento: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    title: str
    description: str | None
    start_date: datetime
    end_date: datetime
    direccion: str
    numero_asistentes: int
    users: list['User'] = Relationship(back_populates='events', link_model=UserEventLink)
