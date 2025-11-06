# # # auth/dependencies.py
# # from fastapi import Depends, HTTPException, status, Cookie
# # from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
# # from jose import JWTError, jwt
# # from sqlmodel import Session, select
# # from typing import Optional
# # import os

# # from models.database import get_session
# # from models.models import User, TokenData

# # SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-this")
# # ALGORITHM = "HS256"
# # ACCESS_TOKEN_EXPIRE_MINUTES = 30

# # security = HTTPBearer()

# # def verify_token(token: str, credentials_exception):
# #     try:
# #         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
# #         email: str = payload.get("sub")
# #         if email is None:
# #             raise credentials_exception
# #         token_data = TokenData(email=email)
# #     except JWTError:
# #         raise credentials_exception
# #     return token_data

# # async def get_current_user(
# #     session: Session = Depends(get_session),
# #     credentials: HTTPAuthorizationCredentials = Depends(security)
# # ):
# #     credentials_exception = HTTPException(
# #         status_code=status.HTTP_401_UNAUTHORIZED,
# #         detail="Could not validate credentials",
# #         headers={"WWW-Authenticate": "Bearer"},
# #     )
    
# #     token_data = verify_token(credentials.credentials, credentials_exception)
# #     statement = select(User).where(User.email == token_data.email)
# #     user = session.exec(statement).first()
# #     if user is None:
# #         raise credentials_exception
# #     return user

# # async def get_current_active_user(current_user: User = Depends(get_current_user)):
# #     if not current_user.is_active:
# #         raise HTTPException(status_code=400, detail="Inactive user")
# #     return current_user

# # def get_current_superuser(current_user: User = Depends(get_current_active_user)):
# #     if not current_user.is_superuser:
# #         raise HTTPException(
# #             status_code=status.HTTP_403_FORBIDDEN,
# #             detail="Not enough permissions",
# #         )
# #     return current_user

# from fastapi import Depends, HTTPException, status
# from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
# from sqlalchemy.orm import Session
# from jose import JWTError, jwt
# from passlib.context import CryptContext
# from datetime import datetime, timedelta
# import os

# from models.database import get_db
# from models.models import User
# from schemas import TokenData

# # Security Configuration
# SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
# ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 30
# REFRESH_TOKEN_EXPIRE_DAYS = 7

# # Password hashing
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# # JWT Bearer scheme
# security = HTTPBearer()

# def verify_password(plain_password: str, hashed_password: str) -> bool:
#     """Verify a password against its hash"""
#     return pwd_context.verify(plain_password, hashed_password)

# def get_password_hash(password: str) -> str:
#     """Hash a password"""
#     return pwd_context.hash(password)

# def create_access_token(data: dict, expires_delta: timedelta = None) -> str:
#     """Create JWT access token"""
#     to_encode = data.copy()
#     if expires_delta:
#         expire = datetime.utcnow() + expires_delta
#     else:
#         expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
#     to_encode.update({"exp": expire, "type": "access"})
#     encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
#     return encoded_jwt

# def create_refresh_token(data: dict) -> str:
#     """Create JWT refresh token"""
#     to_encode = data.copy()
#     expire = datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
#     to_encode.update({"exp": expire, "type": "refresh"})
#     encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
#     return encoded_jwt

# def verify_token(token: str) -> TokenData:
#     """Verify and decode JWT token"""
#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
    
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         user_id: int = payload.get("sub")
#         email: str = payload.get("email")
        
#         if user_id is None:
#             raise credentials_exception
            
#         token_data = TokenData(user_id=user_id, email=email)
#         return token_data
#     except JWTError:
#         raise credentials_exception

# async def get_current_user(
#     credentials: HTTPAuthorizationCredentials = Depends(security),
#     db: Session = Depends(get_db)
# ) -> User:
#     """Get current authenticated user"""
#     token = credentials.credentials
#     token_data = verify_token(token)
    
#     user = db.query(User).filter(User.id == token_data.user_id).first()
#     if user is None:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="User not found"
#         )
    
#     return user

# def authenticate_user(db: Session, email: str, password: str) -> User:
#     """Authenticate user with email and password"""
#     user = db.query(User).filter(User.email == email).first()
#     if not user:
#         return None
#     if not verify_password(password, user.password):
#         return None
#     return user

# auth/dependencies.py

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
from models.database import get_db
from models.models import User
from schemas import TokenData

from dotenv import load_dotenv
import os

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_DAYS = 7


# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT Bearer scheme
security = HTTPBearer()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire, "type": "access"})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def create_refresh_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire, "type": "refresh"})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str) -> TokenData:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id_str: str = payload.get("sub")
        email: str = payload.get("email")
        
        if user_id_str is None:
            raise credentials_exception
        
        user_id = int(user_id_str)
        token_data = TokenData(user_id=user_id, email=email)
        return token_data
    except (JWTError, ValueError):
        raise credentials_exception

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> User:
    token = credentials.credentials
    token_data = verify_token(token)
    
    user = db.query(User).filter(User.id == token_data.user_id).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    return user

def authenticate_user(db: Session, email: str, password: str) -> User | None:
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return None
    if not verify_password(password, user.password):
        return None
    return user