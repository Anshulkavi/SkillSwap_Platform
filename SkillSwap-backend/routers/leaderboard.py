from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List

from models.database import get_db
from models.models import User
from schemas import UserResponse
from auth.dependencies import get_current_user

router = APIRouter()

@router.get("", response_model=List[UserResponse])
async def get_leaderboard(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    period: str = Query("all-time", regex="^(all-time|monthly|weekly|daily)$"),
    category: str = Query("overall"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get leaderboard rankings"""
    query = db.query(User).order_by(desc(User.xp))
    users = query.offset(skip).limit(limit).all()
    return users

@router.get("/achievements")
async def get_community_achievements(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get community-wide achievements and top performers"""
    top_contributor = db.query(User).order_by(desc(User.xp)).first()
    
    return {
        "top_contributor": {
            "user": top_contributor,
            "metric": "Most XP earned"
        }
    }

@router.get("/my-rank")
async def get_my_rank(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get current user's rank on leaderboard"""
    users_above = db.query(User).filter(User.xp > current_user.xp).count()
    rank = users_above + 1
    
    total_users = db.query(User).count()
    percentile = ((total_users - rank) / total_users) * 100 if total_users > 0 else 0
    
    return {
        "rank": rank,
        "total_users": total_users,
        "percentile": round(percentile, 2),
        "user": current_user
    }