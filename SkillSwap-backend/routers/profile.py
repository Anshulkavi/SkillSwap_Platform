from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from models.database import get_db
from models.models import User
from schemas import UserResponse, UserUpdate, MessageResponse
from auth.dependencies import get_current_user

router = APIRouter()

@router.get("/me", response_model=UserResponse)
async def get_my_profile(
    current_user: User = Depends(get_current_user)
):
    """Get current user's profile"""
    return current_user

@router.put("/me", response_model=UserResponse)
async def update_my_profile(
    updates: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update current user's profile"""
    update_data = updates.dict(exclude_unset=True)
    
    for field, value in update_data.items():
        setattr(current_user, field, value)
    
    db.commit()
    db.refresh(current_user)
    return current_user

@router.get("/{user_id}", response_model=UserResponse)
async def get_user_profile(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get another user's profile by ID"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user