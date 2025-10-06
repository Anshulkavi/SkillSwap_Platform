# models.py

# Add Table to your sqlalchemy imports
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Float, Boolean, JSON, Table
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from models.database import Base

# 👇 NEW: Define the many-to-many association table for likes
listing_likes = Table('listing_likes', Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id'), primary_key=True),
    Column('listing_id', Integer, ForeignKey('listings.id'), primary_key=True)
)

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
    
    level = Column(Integer, default=1)
    xp = Column(Integer, default=0)
    badges = Column(JSON, default=[])
    
    skills_offered = Column(JSON, default=[])
    skills_learning = Column(JSON, default=[])
    
    social_links = Column(JSON, default={})
    
    profile_visibility = Column(String(50), default="public")
    show_online_status = Column(Boolean, default=True)
    allow_direct_messages = Column(Boolean, default=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    listings = relationship("Listing", back_populates="user")
    posts = relationship("CommunityPost", back_populates="user")
    reviews_given = relationship("Review", foreign_keys="Review.reviewer_id", back_populates="reviewer")
    reviews_received = relationship("Review", foreign_keys="Review.reviewed_id", back_populates="reviewed")

    # 👇 NEW: Add the relationship for liked listings
    liked_listings = relationship("Listing", secondary=listing_likes, back_populates="liked_by_users")

    # 👇 NEW: Add the relationship back to Video
    videos = relationship("Video", back_populates="user")

class Listing(Base):
    __tablename__ = "listings"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    skill_offered = Column(String(255), nullable=False)
    skill_wanted = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    
    availability = Column(JSON, default=[])
    session_type = Column(JSON, default=[])
    hourly_rate = Column(String(100), default="Free Exchange")
    tags = Column(JSON, default=[])
    
    response_time = Column(String(50), default="< 24 hours")
    total_sessions = Column(Integer, default=0)
    
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    user = relationship("User", back_populates="listings")
    requests = relationship("Request", back_populates="listing")

    # 👇 NEW: Add the relationship for users who liked this listing
    liked_by_users = relationship("User", secondary=listing_likes, back_populates="liked_listings")

class Request(Base):
    __tablename__ = "requests"
    
    id = Column(Integer, primary_key=True, index=True)
    from_user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    to_user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    listing_id = Column(Integer, ForeignKey("listings.id"), nullable=False)
    
    message = Column(Text, nullable=True)
    status = Column(String(50), default="pending")
    
    scheduled_time = Column(DateTime(timezone=True), nullable=True)
    duration = Column(Integer, nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
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
    
    user = relationship("User", back_populates="posts")
    comments = relationship("Comment", back_populates="post")

class Comment(Base):
    __tablename__ = "comments"
    
    id = Column(Integer, primary_key=True, index=True)
    post_id = Column(Integer, ForeignKey("community_posts.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    content = Column(Text, nullable=False)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
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
    
    category = Column(String(100), nullable=True)
    level = Column(String(50), nullable=True)
    tags = Column(JSON, default=[])
    
    views = Column(Integer, default=0)
    likes = Column(Integer, default=0)
    
    status = Column(String(50), default="published")
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    user = relationship("User")