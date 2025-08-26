# routers/reviews.py
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List

from models.database import get_session
from models.models import Review, ReviewCreate, ReviewRead, User, SwapRequest, RequestStatus
from auth.dependencies import get_current_active_user

router = APIRouter()

@router.post("/", response_model=ReviewRead)
async def create_review(
    review: ReviewCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    # Check if swap request exists and is completed
    swap_request = session.get(SwapRequest, review.swap_request_id)
    if not swap_request:
        raise HTTPException(status_code=404, detail="Swap request not found")
    
    if swap_request.status != RequestStatus.COMPLETED:
        raise HTTPException(status_code=400, detail="Can only review completed swaps")
    
    # Check if user was part of this swap
    if current_user.id not in [swap_request.requester_id, swap_request.listing_owner_id]:
        raise HTTPException(status_code=403, detail="Not authorized to review this swap")
    
    # Check if reviewee is valid
    reviewee = session.get(User, review.reviewee_id)
    if not reviewee:
        raise HTTPException(status_code=404, detail="Reviewee not found")
    
    # Check if review already exists
    statement = select(Review).where(
        Review.reviewer_id == current_user.id,
        Review.swap_request_id == review.swap_request_id
    )
    existing_review = session.exec(statement).first()
    if existing_review:
        raise HTTPException(status_code=400, detail="Review already exists")
    
    db_review = Review(**review.dict(), reviewer_id=current_user.id)
    session.add(db_review)
    session.commit()
    session.refresh(db_review)
    return db_review

@router.get("/user/{user_id}", response_model=List[ReviewRead])
async def get_user_reviews(
    user_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    statement = select(Review).where(Review.reviewee_id == user_id)
    reviews = session.exec(statement).all()
    return reviews

@router.get("/my", response_model=List[ReviewRead])
async def get_my_reviews(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    statement = select(Review).where(Review.reviewee_id == current_user.id)
    reviews = session.exec(statement).all()
    return reviews