# routers/user.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.database import get_db
from models.models import User

router = APIRouter(prefix="/api/users", tags=["Users"])

@router.get("/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    """Get public user info (used in chat and profile views)"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,  # Optional: remove this if privacy needed
        "avatar": user.avatar,
        "bio": user.bio,
        "location": user.location,
        "level": user.level,
    }