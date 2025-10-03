# from sqlmodel import SQLModel, Field, Relationship
# from typing import Optional, List
# from datetime import datetime
# from enum import Enum


# # ------------------------------
# # USER MODELS
# # ------------------------------
# class UserBase(SQLModel):
#     email: str = Field(unique=True, index=True)
#     name: str
#     bio: Optional[str] = None
#     location: Optional[str] = None
#     avatar: Optional[str] = None
#     skills_offered: Optional[str] = None
#     skills_wanted: Optional[str] = None


# class User(UserBase, table=True):
#     id: Optional[int] = Field(default=None, primary_key=True)
#     hashed_password: str
#     is_active: bool = Field(default=True)
#     is_superuser: bool = Field(default=False)
#     created_at: datetime = Field(default_factory=datetime.utcnow)

#     # Relationships
#     listings: List["Listing"] = Relationship(back_populates="owner")
#     sent_requests: List["SwapRequest"] = Relationship(
#         back_populates="requester",
#         sa_relationship_kwargs={"foreign_keys": "[SwapRequest.requester_id]"}
#     )
#     received_requests: List["SwapRequest"] = Relationship(
#         back_populates="listing_owner",
#         sa_relationship_kwargs={"foreign_keys": "[SwapRequest.listing_owner_id]"}
#     )
#     sent_messages: List["Message"] = Relationship(
#         back_populates="sender",
#         sa_relationship_kwargs={"foreign_keys": "[Message.sender_id]"}
#     )
#     received_messages: List["Message"] = Relationship(
#         back_populates="receiver",
#         sa_relationship_kwargs={"foreign_keys": "[Message.receiver_id]"}
#     )
#     given_reviews: List["Review"] = Relationship(
#         back_populates="reviewer",
#         sa_relationship_kwargs={"foreign_keys": "[Review.reviewer_id]"}
#     )
#     received_reviews: List["Review"] = Relationship(
#         back_populates="reviewee",
#         sa_relationship_kwargs={"foreign_keys": "[Review.reviewee_id]"}
#     )


# class UserCreate(UserBase):
#     password: str


# class UserRead(UserBase):
#     id: int
#     is_active: bool
#     is_superuser: bool
#     created_at: datetime


# class UserUpdate(SQLModel):
#     name: Optional[str] = None
#     bio: Optional[str] = None
#     location: Optional[str] = None
#     avatar: Optional[str] = None
#     skills_offered: Optional[str] = None
#     skills_wanted: Optional[str] = None


# # ------------------------------
# # LISTING MODELS
# # ------------------------------
# class ListingBase(SQLModel):
#     title: str
#     description: str
#     skill_offered: str
#     skill_wanted: Optional[str] = None
#     duration_hours: Optional[int] = None
#     is_active: bool = Field(default=True)


# class Listing(ListingBase, table=True):
#     id: Optional[int] = Field(default=None, primary_key=True)
#     owner_id: int = Field(foreign_key="user.id")
#     created_at: datetime = Field(default_factory=datetime.utcnow)
#     updated_at: datetime = Field(default_factory=datetime.utcnow)

#     # Relationships
#     owner: "User" = Relationship(back_populates="listings")
#     requests: List["SwapRequest"] = Relationship(back_populates="listing")


# class ListingCreate(ListingBase):
#     pass


# class ListingRead(ListingBase):
#     id: int
#     owner_id: int
#     created_at: datetime
#     updated_at: datetime
#     owner: Optional["UserRead"] = None


# class ListingUpdate(SQLModel):
#     title: Optional[str] = None
#     description: Optional[str] = None
#     skill_offered: Optional[str] = None
#     skill_wanted: Optional[str] = None
#     duration_hours: Optional[int] = None
#     is_active: Optional[bool] = None


# # ------------------------------
# # SWAP REQUEST MODELS
# # ------------------------------
# class RequestStatus(str, Enum):
#     PENDING = "pending"
#     ACCEPTED = "accepted"
#     REJECTED = "rejected"
#     COMPLETED = "completed"


# class SwapRequestBase(SQLModel):
#     listing_id: int = Field(foreign_key="listing.id")
#     message: Optional[str] = None


# class SwapRequest(SwapRequestBase, table=True):
#     id: Optional[int] = Field(default=None, primary_key=True)
#     requester_id: int = Field(foreign_key="user.id")
#     listing_owner_id: int = Field(foreign_key="user.id")
#     status: RequestStatus = Field(default=RequestStatus.PENDING)
#     created_at: datetime = Field(default_factory=datetime.utcnow)
#     updated_at: datetime = Field(default_factory=datetime.utcnow)

#     # Relationships
#     listing: "Listing" = Relationship(back_populates="requests")
#     requester: "User" = Relationship(
#         back_populates="sent_requests",
#         sa_relationship_kwargs={"foreign_keys": "[SwapRequest.requester_id]"}
#     )
#     listing_owner: "User" = Relationship(
#         back_populates="received_requests",
#         sa_relationship_kwargs={"foreign_keys": "[SwapRequest.listing_owner_id]"}
#     )


# class SwapRequestCreate(SwapRequestBase):
#     pass


# class SwapRequestRead(SwapRequestBase):
#     id: int
#     requester_id: int
#     listing_owner_id: int
#     status: RequestStatus
#     created_at: datetime
#     updated_at: datetime
#     listing: Optional["ListingRead"] = None
#     requester: Optional["UserRead"] = None


# class SwapRequestUpdate(SQLModel):
#     status: Optional[RequestStatus] = None
#     message: Optional[str] = None


# # ------------------------------
# # MESSAGE MODELS
# # ------------------------------
# class MessageBase(SQLModel):
#     receiver_id: int = Field(foreign_key="user.id")
#     text: str


# class Message(MessageBase, table=True):
#     id: Optional[int] = Field(default=None, primary_key=True)
#     sender_id: int = Field(foreign_key="user.id")
#     timestamp: datetime = Field(default_factory=datetime.utcnow)
#     read_status: bool = Field(default=False)

#     # Relationships
#     sender: "User" = Relationship(
#         back_populates="sent_messages",
#         sa_relationship_kwargs={"foreign_keys": "[Message.sender_id]"}
#     )
#     receiver: "User" = Relationship(
#         back_populates="received_messages",
#         sa_relationship_kwargs={"foreign_keys": "[Message.receiver_id]"}
#     )


# class MessageCreate(MessageBase):
#     pass


# class MessageRead(MessageBase):
#     id: int
#     sender_id: int
#     timestamp: datetime
#     read_status: bool
#     sender: Optional["UserRead"] = None
#     receiver: Optional["UserRead"] = None


# # ------------------------------
# # REVIEW MODELS
# # ------------------------------
# class ReviewBase(SQLModel):
#     rating: int = Field(ge=1, le=5)
#     text: Optional[str] = None
#     swap_request_id: int = Field(foreign_key="swaprequest.id")


# class Review(ReviewBase, table=True):
#     id: Optional[int] = Field(default=None, primary_key=True)
#     reviewer_id: int = Field(foreign_key="user.id")
#     reviewee_id: int = Field(foreign_key="user.id")
#     created_at: datetime = Field(default_factory=datetime.utcnow)

#     # Relationships
#     reviewer: "User" = Relationship(
#         back_populates="given_reviews",
#         sa_relationship_kwargs={"foreign_keys": "[Review.reviewer_id]"}
#     )
#     reviewee: "User" = Relationship(
#         back_populates="received_reviews",
#         sa_relationship_kwargs={"foreign_keys": "[Review.reviewee_id]"}
#     )


# class ReviewCreate(ReviewBase):
#     reviewee_id: int


# class ReviewRead(ReviewBase):
#     id: int
#     reviewer_id: int
#     reviewee_id: int
#     created_at: datetime
#     reviewer: Optional["UserRead"] = None
#     reviewee: Optional["UserRead"] = None


# # ------------------------------
# # AUTH / TOKEN MODELS
# # ------------------------------
# class Token(SQLModel):
#     access_token: str
#     token_type: str


# class TokenData(SQLModel):
#     email: Optional[str] = None


from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Float, Boolean, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from models.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password = Column(String(255), nullable=False)
    avatar = Column(String(500), nullable=True)
    bio = Column(Text, nullable=True)
    location = Column(String(255), nullable=True)
    website = Column(String(500), nullable=True)
    
    # Gamification
    level = Column(Integer, default=1)
    xp = Column(Integer, default=0)
    badges = Column(JSON, default=[])
    
    # Skills (stored as JSON arrays)
    skills_offered = Column(JSON, default=[])
    skills_learning = Column(JSON, default=[])
    
    # Social links
    social_links = Column(JSON, default={})
    
    # Settings
    profile_visibility = Column(String(50), default="public")
    show_online_status = Column(Boolean, default=True)
    allow_direct_messages = Column(Boolean, default=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    listings = relationship("Listing", back_populates="user")
    posts = relationship("CommunityPost", back_populates="user")
    reviews_given = relationship("Review", foreign_keys="Review.reviewer_id", back_populates="reviewer")
    reviews_received = relationship("Review", foreign_keys="Review.reviewed_id", back_populates="reviewed")

class Listing(Base):
    __tablename__ = "listings"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    skill_offered = Column(String(255), nullable=False)
    skill_wanted = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    
    # Session details
    availability = Column(JSON, default=[])
    session_type = Column(JSON, default=[])
    hourly_rate = Column(String(100), default="Free Exchange")
    tags = Column(JSON, default=[])
    
    # Response metrics
    response_time = Column(String(50), default="< 24 hours")
    total_sessions = Column(Integer, default=0)
    
    # Status
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="listings")
    requests = relationship("Request", back_populates="listing")

class Request(Base):
    __tablename__ = "requests"
    
    id = Column(Integer, primary_key=True, index=True)
    from_user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    to_user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    listing_id = Column(Integer, ForeignKey("listings.id"), nullable=False)
    
    message = Column(Text, nullable=True)
    status = Column(String(50), default="pending")
    
    # Session details
    scheduled_time = Column(DateTime(timezone=True), nullable=True)
    duration = Column(Integer, nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    listing = relationship("Listing", back_populates="requests")

class Review(Base):
    __tablename__ = "reviews"
    
    id = Column(Integer, primary_key=True, index=True)
    reviewer_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    reviewed_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    request_id = Column(Integer, ForeignKey("requests.id"), nullable=True)
    
    rating = Column(Float, nullable=False)
    comment = Column(Text, nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    reviewer = relationship("User", foreign_keys=[reviewer_id], back_populates="reviews_given")
    reviewed = relationship("User", foreign_keys=[reviewed_id], back_populates="reviews_received")

class CommunityPost(Base):
    __tablename__ = "community_posts"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    content = Column(Text, nullable=False)
    image_url = Column(String(500), nullable=True)
    
    likes = Column(Integer, default=0)
    comments_count = Column(Integer, default=0)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="posts")
    comments = relationship("Comment", back_populates="post")

class Comment(Base):
    __tablename__ = "comments"
    
    id = Column(Integer, primary_key=True, index=True)
    post_id = Column(Integer, ForeignKey("community_posts.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    content = Column(Text, nullable=False)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    post = relationship("CommunityPost", back_populates="comments")

class ChatMessage(Base):
    __tablename__ = "chat_messages"
    
    id = Column(Integer, primary_key=True, index=True)
    room_id = Column(String(100), nullable=False, index=True)
    sender_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    content = Column(Text, nullable=False)
    message_type = Column(String(50), default="text")
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Video(Base):
    __tablename__ = "videos"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    
    video_url = Column(String(500), nullable=False)
    thumbnail_url = Column(String(500), nullable=True)
    duration = Column(String(20), nullable=True)
    
    # Metadata
    category = Column(String(100), nullable=True)
    level = Column(String(50), nullable=True)
    tags = Column(JSON, default=[])
    
    # Engagement
    views = Column(Integer, default=0)
    likes = Column(Integer, default=0)
    
    # Status
    status = Column(String(50), default="published")
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())