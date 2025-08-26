from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime
from enum import Enum


# ------------------------------
# USER MODELS
# ------------------------------
class UserBase(SQLModel):
    email: str = Field(unique=True, index=True)
    name: str
    bio: Optional[str] = None
    location: Optional[str] = None
    avatar: Optional[str] = None
    skills_offered: Optional[str] = None
    skills_wanted: Optional[str] = None


class User(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    hashed_password: str
    is_active: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    listings: List["Listing"] = Relationship(back_populates="owner")
    sent_requests: List["SwapRequest"] = Relationship(
        back_populates="requester",
        sa_relationship_kwargs={"foreign_keys": "[SwapRequest.requester_id]"}
    )
    received_requests: List["SwapRequest"] = Relationship(
        back_populates="listing_owner",
        sa_relationship_kwargs={"foreign_keys": "[SwapRequest.listing_owner_id]"}
    )
    sent_messages: List["Message"] = Relationship(
        back_populates="sender",
        sa_relationship_kwargs={"foreign_keys": "[Message.sender_id]"}
    )
    received_messages: List["Message"] = Relationship(
        back_populates="receiver",
        sa_relationship_kwargs={"foreign_keys": "[Message.receiver_id]"}
    )
    given_reviews: List["Review"] = Relationship(
        back_populates="reviewer",
        sa_relationship_kwargs={"foreign_keys": "[Review.reviewer_id]"}
    )
    received_reviews: List["Review"] = Relationship(
        back_populates="reviewee",
        sa_relationship_kwargs={"foreign_keys": "[Review.reviewee_id]"}
    )


class UserCreate(UserBase):
    password: str


class UserRead(UserBase):
    id: int
    is_active: bool
    created_at: datetime


class UserUpdate(SQLModel):
    name: Optional[str] = None
    bio: Optional[str] = None
    location: Optional[str] = None
    avatar: Optional[str] = None
    skills_offered: Optional[str] = None
    skills_wanted: Optional[str] = None


# ------------------------------
# LISTING MODELS
# ------------------------------
class ListingBase(SQLModel):
    title: str
    description: str
    skill_offered: str
    skill_wanted: Optional[str] = None
    duration_hours: Optional[int] = None
    is_active: bool = Field(default=True)


class Listing(ListingBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    owner_id: int = Field(foreign_key="user.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    owner: "User" = Relationship(back_populates="listings")
    requests: List["SwapRequest"] = Relationship(back_populates="listing")


class ListingCreate(ListingBase):
    pass


class ListingRead(ListingBase):
    id: int
    owner_id: int
    created_at: datetime
    updated_at: datetime
    owner: Optional["UserRead"] = None


class ListingUpdate(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    skill_offered: Optional[str] = None
    skill_wanted: Optional[str] = None
    duration_hours: Optional[int] = None
    is_active: Optional[bool] = None


# ------------------------------
# SWAP REQUEST MODELS
# ------------------------------
class RequestStatus(str, Enum):
    PENDING = "pending"
    ACCEPTED = "accepted"
    REJECTED = "rejected"
    COMPLETED = "completed"


class SwapRequestBase(SQLModel):
    listing_id: int = Field(foreign_key="listing.id")
    message: Optional[str] = None


class SwapRequest(SwapRequestBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    requester_id: int = Field(foreign_key="user.id")
    listing_owner_id: int = Field(foreign_key="user.id")
    status: RequestStatus = Field(default=RequestStatus.PENDING)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    listing: "Listing" = Relationship(back_populates="requests")
    requester: "User" = Relationship(
        back_populates="sent_requests",
        sa_relationship_kwargs={"foreign_keys": "[SwapRequest.requester_id]"}
    )
    listing_owner: "User" = Relationship(
        back_populates="received_requests",
        sa_relationship_kwargs={"foreign_keys": "[SwapRequest.listing_owner_id]"}
    )


class SwapRequestCreate(SwapRequestBase):
    pass


class SwapRequestRead(SwapRequestBase):
    id: int
    requester_id: int
    listing_owner_id: int
    status: RequestStatus
    created_at: datetime
    updated_at: datetime
    listing: Optional["ListingRead"] = None
    requester: Optional["UserRead"] = None


class SwapRequestUpdate(SQLModel):
    status: Optional[RequestStatus] = None
    message: Optional[str] = None


# ------------------------------
# MESSAGE MODELS
# ------------------------------
class MessageBase(SQLModel):
    receiver_id: int = Field(foreign_key="user.id")
    text: str


class Message(MessageBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    sender_id: int = Field(foreign_key="user.id")
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    read_status: bool = Field(default=False)

    # Relationships
    sender: "User" = Relationship(
        back_populates="sent_messages",
        sa_relationship_kwargs={"foreign_keys": "[Message.sender_id]"}
    )
    receiver: "User" = Relationship(
        back_populates="received_messages",
        sa_relationship_kwargs={"foreign_keys": "[Message.receiver_id]"}
    )


class MessageCreate(MessageBase):
    pass


class MessageRead(MessageBase):
    id: int
    sender_id: int
    timestamp: datetime
    read_status: bool
    sender: Optional["UserRead"] = None
    receiver: Optional["UserRead"] = None


# ------------------------------
# REVIEW MODELS
# ------------------------------
class ReviewBase(SQLModel):
    rating: int = Field(ge=1, le=5)
    text: Optional[str] = None
    swap_request_id: int = Field(foreign_key="swaprequest.id")


class Review(ReviewBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    reviewer_id: int = Field(foreign_key="user.id")
    reviewee_id: int = Field(foreign_key="user.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    reviewer: "User" = Relationship(
        back_populates="given_reviews",
        sa_relationship_kwargs={"foreign_keys": "[Review.reviewer_id]"}
    )
    reviewee: "User" = Relationship(
        back_populates="received_reviews",
        sa_relationship_kwargs={"foreign_keys": "[Review.reviewee_id]"}
    )


class ReviewCreate(ReviewBase):
    reviewee_id: int


class ReviewRead(ReviewBase):
    id: int
    reviewer_id: int
    reviewee_id: int
    created_at: datetime
    reviewer: Optional["UserRead"] = None
    reviewee: Optional["UserRead"] = None


# ------------------------------
# AUTH / TOKEN MODELS
# ------------------------------
class Token(SQLModel):
    access_token: str
    token_type: str


class TokenData(SQLModel):
    email: Optional[str] = None
