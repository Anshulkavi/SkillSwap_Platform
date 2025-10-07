from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from models.database import get_db
from schemas import UserLogin, Token
from auth.dependencies import (
    authenticate_user,
    create_access_token,
    create_refresh_token,
    get_current_user
)

router = APIRouter()

@router.post("/login", response_model=Token)
async def login(
    credentials: UserLogin,
    db: Session = Depends(get_db)
):
    """Login endpoint for user authentication"""
    user = authenticate_user(db, credentials.email, credentials.password)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # 👇 THE FIX: Convert user.id to a string before creating the token
    access_token = create_access_token(
        data={"sub": str(user.id), "email": user.email}
    )
    refresh_token = create_refresh_token(
        data={"sub": str(user.id), "email": user.email}
    )
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user": user
    }

@router.post("/login/refresh", response_model=Token)
async def refresh_token(
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Refresh access token using refresh token"""
    # 👇 Also fixed here for consistency
    access_token = create_access_token(
        data={"sub": str(current_user.id), "email": current_user.email}
    )
    refresh_token = create_refresh_token(
        data={"sub": str(current_user.id), "email": current_user.email}
    )
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user": current_user
    }

@router.post("/logout")
async def logout(current_user = Depends(get_current_user)):
    """Logout endpoint"""
    return {"message": "Successfully logged out"}