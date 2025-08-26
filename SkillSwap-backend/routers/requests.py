# routers/requests.py
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List
from datetime import datetime

from models.database import get_session
from models.models import (
    SwapRequest, SwapRequestCreate, SwapRequestRead, SwapRequestUpdate, 
    User, Listing, RequestStatus
)
from auth.dependencies import get_current_active_user

router = APIRouter()

@router.post("/", response_model=SwapRequestRead)
async def create_swap_request(
    request: SwapRequestCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    # Check if listing exists
    listing = session.get(Listing, request.listing_id)
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    
    # Check if user is not requesting their own listing
    if listing.owner_id == current_user.id:
        raise HTTPException(status_code=400, detail="Cannot request your own listing")
    
    # Check if request already exists
    statement = select(SwapRequest).where(
        SwapRequest.listing_id == request.listing_id,
        SwapRequest.requester_id == current_user.id,
        SwapRequest.status == RequestStatus.PENDING
    )
    existing_request = session.exec(statement).first()
    if existing_request:
        raise HTTPException(status_code=400, detail="Request already exists")
    
    db_request = SwapRequest(
        **request.dict(),
        requester_id=current_user.id,
        listing_owner_id=listing.owner_id
    )
    session.add(db_request)
    session.commit()
    session.refresh(db_request)
    return db_request

@router.get("/sent", response_model=List[SwapRequestRead])
async def read_sent_requests(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    statement = select(SwapRequest).where(SwapRequest.requester_id == current_user.id)
    requests = session.exec(statement).all()
    return requests

@router.get("/received", response_model=List[SwapRequestRead])
async def read_received_requests(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    statement = select(SwapRequest).where(SwapRequest.listing_owner_id == current_user.id)
    requests = session.exec(statement).all()
    return requests

@router.put("/{request_id}", response_model=SwapRequestRead)
async def update_swap_request(
    request_id: int,
    request_update: SwapRequestUpdate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    swap_request = session.get(SwapRequest, request_id)
    if not swap_request:
        raise HTTPException(status_code=404, detail="Request not found")
    
    # Only listing owner can accept/reject, requester can update message
    if swap_request.listing_owner_id != current_user.id and swap_request.requester_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this request")
    
    # Only listing owner can change status
    if request_update.status and swap_request.listing_owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Only listing owner can change status")
    
    update_data = request_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(swap_request, field, value)
    
    swap_request.updated_at = datetime.utcnow()
    session.add(swap_request)
    session.commit()
    session.refresh(swap_request)
    return swap_request
