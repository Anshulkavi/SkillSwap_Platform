# routers/listings.py
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List, Optional
from datetime import datetime

from models.database import get_session
from models.models import Listing, ListingCreate, ListingRead, ListingUpdate, User
from auth.dependencies import get_current_active_user

router = APIRouter()

@router.post("/", response_model=ListingRead)
async def create_listing(
    listing: ListingCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    db_listing = Listing(**listing.dict(), owner_id=current_user.id)
    session.add(db_listing)
    session.commit()
    session.refresh(db_listing)
    return db_listing

@router.get("/", response_model=List[ListingRead])
async def read_listings(
    skip: int = 0,
    limit: int = 100,
    search: Optional[str] = None,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    statement = select(Listing).where(Listing.is_active == True)
    
    if search:
        statement = statement.where(
            Listing.title.contains(search) | 
            Listing.description.contains(search) |
            Listing.skill_offered.contains(search)
        )
    
    statement = statement.offset(skip).limit(limit)
    listings = session.exec(statement).all()
    return listings

@router.get("/my", response_model=List[ListingRead])
async def read_my_listings(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    statement = select(Listing).where(Listing.owner_id == current_user.id)
    listings = session.exec(statement).all()
    return listings

@router.get("/{listing_id}", response_model=ListingRead)
async def read_listing(
    listing_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    listing = session.get(Listing, listing_id)
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    return listing

@router.put("/{listing_id}", response_model=ListingRead)
async def update_listing(
    listing_id: int,
    listing_update: ListingUpdate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    listing = session.get(Listing, listing_id)
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    
    if listing.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this listing")
    
    update_data = listing_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(listing, field, value)
    
    listing.updated_at = datetime.utcnow()
    session.add(listing)
    session.commit()
    session.refresh(listing)
    return listing

@router.delete("/{listing_id}")
async def delete_listing(
    listing_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    listing = session.get(Listing, listing_id)
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    
    if listing.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this listing")
    
    session.delete(listing)
    session.commit()
    return {"message": "Listing deleted successfully"}