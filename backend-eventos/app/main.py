from fastapi import FastAPI
from sqlmodel import SQLModel

from .routers import roles, users, auth, event, seed
from .config.database import engine
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(roles.router)
app.include_router(users.router)
app.include_router(auth.router)
app.include_router(event.router)
app.include_router(seed.router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def on_startup():
    SQLModel.metadata.create_all(engine)

@app.get("/")
async def read_root():
    return {"Hello": "World"}
