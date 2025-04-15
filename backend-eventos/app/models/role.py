from sqlmodel import SQLModel, Field
from typing import Optional
import uuid
import time

class Role(SQLModel, table=True):
    uuid_rol: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    name: str
    created_at: int = Field(default_factory=lambda: int(time.time()))
    permissions: Optional[str] = Field(default=None, description="Permissions can be 'limit', 'organization', or 'fullaccess'")
    role_level: int
    # Eliminada la relación 'users' para evitar problemas de mapeo
