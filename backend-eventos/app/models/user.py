from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Table, Column, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from app.models.event import Event
from typing import Optional, List
import uuid
from bcrypt import hashpw, gensalt

class UserEventLink(SQLModel, table=True):
    __tablename__ = 'usereventlink'
    __table_args__ = {'extend_existing': True}
    user_id: uuid.UUID = Field(default=None, foreign_key="user.uuid_user", primary_key=True)
    event_id: uuid.UUID = Field(default=None, foreign_key="event.uuid_evento", primary_key=True)

class User(SQLModel, table=True):
    uuid_user: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    name: str
    last_name: str
    email: str
    password: str
    uuid_role: uuid.UUID = Field(foreign_key="role.uuid_rol")
    role: Optional['Role'] = Relationship()
    events: List['Event'] = Relationship(back_populates='users', link_model=UserEventLink)

    def set_password(self, plain_password: str):
        self.password = hashpw(plain_password.encode('utf-8'), gensalt()).decode('utf-8')
