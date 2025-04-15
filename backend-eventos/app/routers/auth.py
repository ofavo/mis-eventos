from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer
from sqlmodel import Session, select
from ..models.user import User
from ..config.database import engine
from bcrypt import checkpw
from pydantic import BaseModel
from jose import JWTError, jwt
from datetime import datetime, timedelta
import os

router = APIRouter()

class LoginData(BaseModel):
    email: str
    password: str

SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = int(os.getenv("JWT_EXPIRATION_HOURS"))

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

# Dependency to verify JWT token
async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    return user_id

# Dependency to get DB session
async def get_session():
    with Session(engine) as session:
        yield session

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(hours=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@router.post("/auth/login")
async def login(data: LoginData, session: Session = Depends(get_session)):
    print("Login attempt for email:", data.email)
    print("Password:", data.password)
    user = session.exec(select(User).where(User.email == data.email)).first()
    print("User found:", user)
    if not user or not checkpw(data.password.encode('utf-8'), user.password.encode('utf-8')):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    access_token_expires = timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    access_token = create_access_token(
        data={"sub": str(user.uuid_user)}, expires_delta=access_token_expires
    )
    # Determine redirect path based on user role
    redirect_path = "user" if user.role.name == "user" else "dashboard"
    return {"access_token": access_token, "token_type": "bearer", "redirect": redirect_path, "uuid_user": str(user.uuid_user)}

@router.post("/auth/register")
async def register(user: User, session: Session = Depends(get_session)):
    user.set_password(user.password)  # Encrypt the password
    session.add(user)
    session.commit()
    session.refresh(user)
    return {"message": "User registered successfully", "user_id": user.uuid_user}

@router.post("/auth/forgot-password")
async def forgot_password(email: str, session: Session = Depends(get_session)):
    user = session.exec(select(User).where(User.email == email)).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    # Here you would normally send an email with a reset link
    return {"message": "Password reset link sent"}
