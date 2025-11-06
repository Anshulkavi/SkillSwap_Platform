# # routers/skill_exchange.py

# from fastapi import APIRouter, Depends, HTTPException, status, Query
# # 👇 NEW: Add selectinload to imports
# from sqlalchemy.orm import Session, selectinload 
# from typing import List, Optional

# from models.database import get_db
# from models.models import User, Listing, Request
# from schemas import (
#     ListingCreate, ListingResponse, RequestCreate, 
#     RequestResponse, MessageResponse
# )
# from auth.dependencies import get_current_user

# router = APIRouter()

# # 👇 UPDATED: This function is replaced with a new version
# @router.get("/listings", response_model=List[ListingResponse])
# async def get_skill_listings(
#     skip: int = Query(0, ge=0),
#     limit: int = Query(50, ge=1, le=100),
#     category: Optional[str] = None,
#     skill_offered: Optional[str] = None,
#     skill_wanted: Optional[str] = None,
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user)
# ):
#     """Get all skill exchange listings with filters"""
#     query = db.query(Listing).options(
#         selectinload(Listing.user)  # Eagerly load the user details
#     ).filter(Listing.is_active == True)
    
#     if category:
#         query = query.filter(Listing.tags.contains([category]))
#     if skill_offered:
#         query = query.filter(Listing.skill_offered.ilike(f"%{skill_offered}%"))
#     if skill_wanted:
#         query = query.filter(Listing.skill_wanted.ilike(f"%{skill_wanted}%"))
    
#     listings = query.offset(skip).limit(limit).all()

#     # Get a set of IDs for listings liked by the current user for efficient lookup
#     liked_listing_ids = {l.id for l in current_user.liked_listings}
    
#     # Process listings to set the 'is_liked' flag
#     for listing in listings:
#         listing.is_liked = listing.id in liked_listing_ids
            
#     return listings

# @router.post("/listings", response_model=ListingResponse, status_code=status.HTTP_201_CREATED)
# async def create_skill_listing(
#     listing_data: ListingCreate,
#     current_user: User = Depends(get_current_user),
#     db: Session = Depends(get_db)
# ):
#     """Create a new skill exchange listing"""
#     new_listing = Listing(
#         user_id=current_user.id,
#         **listing_data.dict()
#     )
#     db.add(new_listing)
#     db.commit()
#     db.refresh(new_listing)
#     return new_listing

# @router.get("/listings/{listing_id}", response_model=ListingResponse)
# async def get_listing(
#     listing_id: int,
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user)
# ):
#     """Get specific listing by ID"""
#     listing = db.query(Listing).filter(Listing.id == listing_id).first()
#     if not listing:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Listing not found"
#         )
#     return listing

# @router.put("/listings/{listing_id}", response_model=ListingResponse)
# async def update_listing(
#     listing_id: int,
#     updates: ListingCreate,
#     current_user: User = Depends(get_current_user),
#     db: Session = Depends(get_db)
# ):
#     """Update own listing"""
#     listing = db.query(Listing).filter(
#         Listing.id == listing_id,
#         Listing.user_id == current_user.id
#     ).first()
#     if not listing:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Listing not found or unauthorized"
#         )
#     for field, value in updates.dict().items():
#         setattr(listing, field, value)
#     db.commit()
#     db.refresh(listing)
#     return listing

# @router.delete("/listings/{listing_id}", status_code=status.HTTP_204_NO_CONTENT)
# async def delete_listing(
#     listing_id: int,
#     current_user: User = Depends(get_current_user),
#     db: Session = Depends(get_db)
# ):
#     """Delete own listing"""
#     listing = db.query(Listing).filter(
#         Listing.id == listing_id,
#         Listing.user_id == current_user.id
#     ).first()
#     if not listing:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Listing not found or unauthorized"
#         )
#     db.delete(listing)
#     db.commit()
#     return None

# # 👇 NEW: Add these two new endpoints to the bottom of the file
# @router.post("/listings/{listing_id}/like", response_model=MessageResponse)
# async def like_listing(
#     listing_id: int,
#     current_user: User = Depends(get_current_user),
#     db: Session = Depends(get_db)
# ):
#     listing = db.query(Listing).filter(Listing.id == listing_id).first()
#     if not listing:
#         raise HTTPException(status_code=404, detail="Listing not found")
    
#     # Add the listing to the user's liked list if it's not already there
#     if listing not in current_user.liked_listings:
#         current_user.liked_listings.append(listing)
#         db.commit()
#     return {"message": "Listing liked successfully"}

# @router.delete("/listings/{listing_id}/like", response_model=MessageResponse)
# async def unlike_listing(
#     listing_id: int,
#     current_user: User = Depends(get_current_user),
#     db: Session = Depends(get_db)
# ):
#     listing = db.query(Listing).filter(Listing.id == listing_id).first()
#     if not listing:
#         raise HTTPException(status_code=404, detail="Listing not found")
    
#     # Remove the listing from the user's liked list if it's there
#     if listing in current_user.liked_listings:
#         current_user.liked_listings.remove(listing)
#         db.commit()
#     return {"message": "Listing unliked successfully"}

# @router.post("/requests", response_model=RequestResponse, status_code=status.HTTP_201_CREATED)
# async def create_exchange_request(
#     request_data: RequestCreate,
#     current_user: User = Depends(get_current_user),
#     db: Session = Depends(get_db)
# ):
#     """Create a skill exchange request"""
#     listing = db.query(Listing).filter(Listing.id == request_data.listing_id).first()
#     if not listing:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Listing not found"
#         )
    
#     new_request = Request(
#         from_user_id=current_user.id,
#         **request_data.dict()
#     )
    
#     db.add(new_request)
#     db.commit()
#     db.refresh(new_request)
#     return new_request

# @router.get("/requests/sent", response_model=List[RequestResponse])
# async def get_sent_requests(
#     current_user: User = Depends(get_current_user),
#     db: Session = Depends(get_db)
# ):
#     """Get requests sent by current user"""
#     requests = db.query(Request).filter(
#         Request.from_user_id == current_user.id
#     ).all()
#     return requests

# @router.get("/requests/received", response_model=List[RequestResponse])
# async def get_received_requests(
#     current_user: User = Depends(get_current_user),
#     db: Session = Depends(get_db)
# ):
#     """Get requests received by current user"""
#     requests = db.query(Request).filter(
#         Request.to_user_id == current_user.id
#     ).all()
#     return requests

# @router.put("/requests/{request_id}/status")
# async def update_request_status(
#     request_id: int,
#     status: str,
#     current_user: User = Depends(get_current_user),
#     db: Session = Depends(get_db)
# ):
#     """Update request status (accept/reject)"""
#     request = db.query(Request).filter(
#         Request.id == request_id,
#         Request.to_user_id == current_user.id
#     ).first()
    
#     if not request:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Request not found or unauthorized"
#         )
    
#     if status not in ["pending", "accepted", "rejected", "completed"]:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Invalid status"
#         )
    
#     request.status = status
#     db.commit()
    
#     return {"message": f"Request status updated to {status}"}

# routers/skill_exchange.py

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session, selectinload
from typing import List, Optional
from models.database import get_db
from models.models import User, Listing, Request
from schemas import (
    ListingCreate, ListingResponse, RequestCreate,
    RequestResponse, MessageResponse
)
from auth.dependencies import get_current_user

router = APIRouter()


# -------------------- LISTINGS --------------------

@router.get("/listings", response_model=List[ListingResponse])
async def get_skill_listings(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    category: Optional[str] = None,
    skill_offered: Optional[str] = None,
    skill_wanted: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all skill exchange listings with filters"""
    query = db.query(Listing).options(selectinload(Listing.user)).filter(Listing.is_active == True)

    if category:
        query = query.filter(Listing.tags.contains([category]))
    if skill_offered:
        query = query.filter(Listing.skill_offered.ilike(f"%{skill_offered}%"))
    if skill_wanted:
        query = query.filter(Listing.skill_wanted.ilike(f"%{skill_wanted}%"))

    listings = query.offset(skip).limit(limit).all()

    liked_listing_ids = {l.id for l in current_user.liked_listings}
    for listing in listings:
        listing.is_liked = listing.id in liked_listing_ids

    return listings


@router.post("/listings", response_model=ListingResponse, status_code=status.HTTP_201_CREATED)
async def create_skill_listing(
    listing_data: ListingCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new skill exchange listing"""
    new_listing = Listing(user_id=current_user.id, **listing_data.dict())
    db.add(new_listing)
    db.commit()
    db.refresh(new_listing)
    return new_listing


@router.get("/listings/{listing_id}", response_model=ListingResponse)
async def get_listing(
    listing_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get specific listing by ID"""
    listing = db.query(Listing).filter(Listing.id == listing_id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    return listing


@router.put("/listings/{listing_id}", response_model=ListingResponse)
async def update_listing(
    listing_id: int,
    updates: ListingCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update own listing"""
    listing = db.query(Listing).filter(
        Listing.id == listing_id,
        Listing.user_id == current_user.id
    ).first()

    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found or unauthorized")

    for field, value in updates.dict().items():
        setattr(listing, field, value)
    db.commit()
    db.refresh(listing)
    return listing


@router.delete("/listings/{listing_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_listing(
    listing_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete own listing"""
    listing = db.query(Listing).filter(
        Listing.id == listing_id,
        Listing.user_id == current_user.id
    ).first()

    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found or unauthorized")

    db.delete(listing)
    db.commit()
    return None


# -------------------- LIKES --------------------

@router.post("/listings/{listing_id}/like", response_model=MessageResponse)
async def like_listing(
    listing_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    listing = db.query(Listing).filter(Listing.id == listing_id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")

    if listing not in current_user.liked_listings:
        current_user.liked_listings.append(listing)
        db.commit()
    return {"message": "Listing liked successfully"}


@router.delete("/listings/{listing_id}/like", response_model=MessageResponse)
async def unlike_listing(
    listing_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    listing = db.query(Listing).filter(Listing.id == listing_id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")

    if listing in current_user.liked_listings:
        current_user.liked_listings.remove(listing)
        db.commit()
    return {"message": "Listing unliked successfully"}


# -------------------- REQUESTS --------------------

@router.post("/requests", response_model=RequestResponse, status_code=status.HTTP_201_CREATED)
async def create_exchange_request(
    request_data: RequestCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a skill exchange request"""
    listing = db.query(Listing).filter(Listing.id == request_data.listing_id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")

    new_request = Request(
        from_user_id=current_user.id,
        to_user_id=listing.user_id,
        listing_id=listing.id,
        message=request_data.message,
    )

    db.add(new_request)
    db.commit()
    db.refresh(new_request)
    return new_request


@router.get("/requests/sent", response_model=List[RequestResponse])
async def get_sent_requests(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get requests sent by current user"""
    return db.query(Request).filter(Request.from_user_id == current_user.id).all()


@router.get("/requests/received", response_model=List[RequestResponse])
async def get_received_requests(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get requests received by current user"""
    return db.query(Request).filter(Request.to_user_id == current_user.id).all()


@router.put("/requests/{request_id}/status", response_model=MessageResponse)
async def update_request_status(
    request_id: int,
    status: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update request status (accept/reject/completed)"""
    request = db.query(Request).filter(
        Request.id == request_id,
        Request.to_user_id == current_user.id
    ).first()

    if not request:
        raise HTTPException(status_code=404, detail="Request not found or unauthorized")

    valid_status = ["pending", "accepted", "rejected", "completed"]
    if status not in valid_status:
        raise HTTPException(status_code=400, detail="Invalid status")

    request.status = status
    db.commit()

    if status == "accepted":
        return {"message": "Request accepted", "room_id": request.room_id}
    return {"message": f"Request status updated to {status}"}


# -------------------- ACTIVE CHAT / EXCHANGES --------------------

@router.get("/requests/active", response_model=List[RequestResponse])
async def get_active_exchanges(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all active (accepted) skill exchanges for chat"""
    active = db.query(Request).filter(
        ((Request.from_user_id == current_user.id) | (Request.to_user_id == current_user.id)),
        Request.status == "accepted"
    ).all()
    return active


@router.get("/chat/rooms")
async def get_user_chat_rooms(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all chat rooms the user is part of"""
    requests = db.query(Request).filter(
        ((Request.from_user_id == current_user.id) | (Request.to_user_id == current_user.id)),
        Request.status == "accepted"
    ).all()

    return [
        {
            "room_id": req.room_id,
            "partner_id": req.to_user_id if req.from_user_id == current_user.id else req.from_user_id,
            "listing_id": req.listing_id,
            "status": req.status
        }
        for req in requests
    ]
