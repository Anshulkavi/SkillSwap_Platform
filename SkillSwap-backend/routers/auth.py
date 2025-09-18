# # routers/auth.py
# from datetime import datetime, timedelta
# from fastapi import APIRouter, Depends, HTTPException, status, Response, Cookie
# from fastapi.security import OAuth2PasswordRequestForm
# from sqlmodel import Session, select
# from passlib.context import CryptContext
# from jose import jwt
# from typing import Optional
# from sqlalchemy import func
# from models.database import get_session
# from models.models import User, UserCreate, UserRead, Token
# from auth.dependencies import get_current_active_user, SECRET_KEY, ALGORITHM

# router = APIRouter()
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# def verify_password(plain_password, hashed_password):
#     return pwd_context.verify(plain_password, hashed_password)

# def get_password_hash(password):
#     return pwd_context.hash(password)

# def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
#     to_encode = data.copy()
#     if expires_delta:
#         expire = datetime.utcnow() + expires_delta
#     else:
#         expire = datetime.utcnow() + timedelta(minutes=15)
#     to_encode.update({"exp": expire})
#     encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
#     return encoded_jwt

# def create_refresh_token(data: dict):
#     to_encode = data.copy()
#     expire = datetime.utcnow() + timedelta(days=7)
#     to_encode.update({"exp": expire})
#     encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
#     return encoded_jwt

# def authenticate_user(session: Session, email: str, password: str):
#     statement = select(User).where(User.email == email)
#     user = session.exec(statement).first()
#     if not user:
#         return False
#     if not verify_password(password, user.hashed_password):
#         return False
#     return user

# # @router.post("/signup", response_model=UserRead)
# # async def signup(user: UserCreate, session: Session = Depends(get_session)):
# #     # Check if user already exists
# #     statement = select(User).where(User.email == user.email)
# #     db_user = session.exec(statement).first()
# #     if db_user:
# #         raise HTTPException(
# #             status_code=400,
# #             detail="Email already registered"
# #         )
    
# #     # Create new user
# #     hashed_password = get_password_hash(user.password)
# #     db_user = User(
# #         email=user.email,
# #         name=user.name,
# #         bio=user.bio,
# #         location=user.location,
# #         avatar=user.avatar,
# #         skills_offered=user.skills_offered,
# #         skills_wanted=user.skills_wanted,
# #         hashed_password=hashed_password
# #     )
# #     session.add(db_user)
# #     session.commit()
# #     session.refresh(db_user)
# #     return db_user

# @router.post("/signup", response_model=UserRead)
# async def signup(user: UserCreate, session: Session = Depends(get_session)):
#     # Check if email already exists
#     statement = select(User).where(User.email == user.email)
#     db_user = session.exec(statement).first()
#     if db_user:
#         raise HTTPException(status_code=400, detail="Email already registered")

#     # Count existing users
#     user_count = session.exec(select(func.count(User.id))).one()

#     # Create user
#     hashed_password = get_password_hash(user.password)
#     db_user = User(
#         email=user.email,
#         name=user.name,
#         bio=user.bio,
#         location=user.location,
#         avatar=user.avatar,
#         skills_offered=user.skills_offered,
#         skills_wanted=user.skills_wanted,
#         hashed_password=hashed_password,
#         is_superuser=(user_count == 0)  # 👈 first user becomes superuser
#     )
#     session.add(db_user)
#     session.commit()
#     session.refresh(db_user)
#     return db_user

# @router.post("/login", response_model=Token)
# async def login(
#     response: Response,
#     form_data: OAuth2PasswordRequestForm = Depends(),
#     session: Session = Depends(get_session)
# ):
#     user = authenticate_user(session, form_data.username, form_data.password)
#     if not user:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Incorrect email or password",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
    
#     access_token_expires = timedelta(minutes=30)
#     access_token = create_access_token(
#         data={"sub": user.email}, expires_delta=access_token_expires
#     )
#     refresh_token = create_refresh_token(data={"sub": user.email})
    
#     # Set refresh token as httpOnly cookie
#     response.set_cookie(
#         key="refresh_token",
#         value=refresh_token,
#         httponly=True,
#         max_age=7*24*60*60,  # 7 days
#         samesite="lax"
#     )
    
#     return {"access_token": access_token, "token_type": "bearer"}

# @router.post("/refresh", response_model=Token)
# async def refresh_token(
#     refresh_token: Optional[str] = Cookie(None),
#     session: Session = Depends(get_session)
# ):
#     if not refresh_token:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Refresh token not found"
#         )
    
#     try:
#         payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
#         email: str = payload.get("sub")
#         if email is None:
#             raise HTTPException(
#                 status_code=status.HTTP_401_UNAUTHORIZED,
#                 detail="Invalid refresh token"
#             )
#     except jwt.JWTError:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Invalid refresh token"
#         )
    
#     # Verify user exists
#     statement = select(User).where(User.email == email)
#     user = session.exec(statement).first()
#     if not user:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="User not found"
#         )
    
#     access_token_expires = timedelta(minutes=30)
#     access_token = create_access_token(
#         data={"sub": user.email}, expires_delta=access_token_expires
#     )
    
#     return {"access_token": access_token, "token_type": "bearer"}

# @router.post("/logout")
# async def logout(response: Response):
#     response.delete_cookie(key="refresh_token")
#     return {"message": "Successfully logged out"}

# @router.get("/me", response_model=UserRead)
# async def read_users_me(current_user: User = Depends(get_current_active_user)):
#     return current_user


# routers/auth.py
from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException, status, Response, Cookie
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select
from passlib.context import CryptContext
from jose import jwt, JWTError
from typing import Optional
from sqlalchemy import func
from models.database import get_session
from models.models import User, UserCreate, UserRead, Token
from auth.dependencies import get_current_active_user, SECRET_KEY, ALGORITHM
from fastapi.responses import RedirectResponse
from dotenv import load_dotenv
import os, httpx, asyncio

load_dotenv()

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# -------------------- Utility functions --------------------

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def create_refresh_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=7)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def authenticate_user(session: Session, email: str, password: str):
    statement = select(User).where(User.email == email)
    user = session.exec(statement).first()
    if not user or not verify_password(password, user.hashed_password):
        return False
    return user

# -------------------- Signup/Login --------------------

@router.post("/signup", response_model=UserRead)
async def signup(user: UserCreate, session: Session = Depends(get_session)):
    statement = select(User).where(User.email == user.email)
    db_user = session.exec(statement).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    user_count = session.exec(select(func.count(User.id))).one()
    hashed_password = get_password_hash(user.password)
    db_user = User(
        email=user.email,
        name=user.name,
        bio=user.bio,
        location=user.location,
        avatar=user.avatar,
        skills_offered=user.skills_offered,
        skills_wanted=user.skills_wanted,
        hashed_password=hashed_password,
        is_superuser=(user_count == 0)
    )
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user

@router.post("/login", response_model=Token)
async def login(
    response: Response,
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: Session = Depends(get_session)
):
    user = authenticate_user(session, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=timedelta(minutes=30)
    )
    refresh_token = create_refresh_token(data={"sub": user.email})

    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        max_age=7*24*60*60,
        samesite="lax"
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/refresh", response_model=Token)
async def refresh_token(
    refresh_token: Optional[str] = Cookie(None),
    session: Session = Depends(get_session)
):
    if not refresh_token:
        raise HTTPException(status_code=401, detail="Refresh token not found")
    
    try:
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if not email:
            raise HTTPException(status_code=401, detail="Invalid refresh token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid refresh token")
    
    statement = select(User).where(User.email == email)
    user = session.exec(statement).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=timedelta(minutes=30)
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie(key="refresh_token")
    return {"message": "Successfully logged out"}

@router.get("/me", response_model=UserRead)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user

# -------------------- GOOGLE OAUTH --------------------

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
REDIRECT_URI = os.getenv("GOOGLE_REDIRECT_URI")
FRONTEND_URL = os.getenv("FRONTEND_URL")

@router.get("/google/login")
async def google_login():
    """Redirect user to Google OAuth login"""
    google_url = (
        "https://accounts.google.com/o/oauth2/v2/auth"
        f"?client_id={GOOGLE_CLIENT_ID}"
        f"&redirect_uri={REDIRECT_URI}"
        "&response_type=code"
        "&scope=openid%20email%20profile"
    )
    return RedirectResponse(google_url)

@router.get("/google/callback")
async def google_callback(code: str, session: Session = Depends(get_session)):
    """Handle Google OAuth callback asynchronously"""
    token_url = "https://oauth2.googleapis.com/token"
    data = {
        "code": code,
        "client_id": GOOGLE_CLIENT_ID,
        "client_secret": GOOGLE_CLIENT_SECRET,
        "redirect_uri": REDIRECT_URI,
        "grant_type": "authorization_code",
    }

    async with httpx.AsyncClient() as client:
        token_res = await client.post(token_url, data=data)
        token_json = token_res.json()
        access_token = token_json.get("access_token")

        if not access_token:
            raise HTTPException(status_code=400, detail="Failed to fetch access token")

        user_res = await client.get(
            "https://www.googleapis.com/oauth2/v2/userinfo",
            headers={"Authorization": f"Bearer {access_token}"}
        )
        user_info = user_res.json()

    email = user_info.get("email")
    name = user_info.get("name")
    avatar = user_info.get("picture")

    statement = select(User).where(User.email == email)
    db_user = session.exec(statement).first()

    if not db_user:
        db_user = User(
            email=email,
            name=name,
            avatar=avatar,
            hashed_password=get_password_hash(os.urandom(8).hex()),
        )
        session.add(db_user)
        session.commit()
        session.refresh(db_user)

    access_token = create_access_token(
        data={"sub": db_user.email}, expires_delta=timedelta(minutes=30)
    )
    refresh_token = create_refresh_token(data={"sub": db_user.email})

    return RedirectResponse(f"{FRONTEND_URL}/auth/success?token={access_token}")
