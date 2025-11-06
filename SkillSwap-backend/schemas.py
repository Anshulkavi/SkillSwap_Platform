# schemas.py
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Dict
from datetime import datetime

# ============= User Schemas =============
class UserBase(BaseModel):
    name: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase):
    id: int
    avatar: Optional[str] = None
    bio: Optional[str] = None
    location: Optional[str] = None
    website: Optional[str] = None
    level: int = 1
    xp: int = 0
    badges: List[str] = []
    skills_offered: List[str] = []
    skills_learning: List[str] = []
    social_links: Dict[str, str] = {}
    profile_visibility: str = "public"
    show_online_status: bool = True
    allow_direct_messages: bool = True
    created_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class UserUpdate(BaseModel):
    name: Optional[str] = None
    bio: Optional[str] = None
    location: Optional[str] = None
    website: Optional[str] = None
    skills_offered: Optional[List[str]] = None
    skills_learning: Optional[List[str]] = None
    social_links: Optional[Dict[str, str]] = None
    profile_visibility: Optional[str] = None
    show_online_status: Optional[bool] = None
    allow_direct_messages: Optional[bool] = None

# ============= Token Schemas =============
class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user: UserResponse

class TokenData(BaseModel):
    user_id: Optional[int] = None
    email: Optional[str] = None

# ============= Listing Schemas =============
class ListingBase(BaseModel):
    skill_offered: str
    skill_wanted: str
    description: Optional[str] = None
    availability: List[str] = []
    session_type: List[str] = []
    hourly_rate: str = "Free Exchange"
    tags: List[str] = []

class ListingCreate(ListingBase):
    pass

class ListingResponse(ListingBase):
    id: int
    user_id: int
    response_time: str
    total_sessions: int
    is_active: bool
    created_at: datetime
    user: UserResponse
    is_liked: bool = False # 👇 NEW: Add this field
    
    class Config:
        from_attributes = True

# ============= Request Schemas =============
class RequestBase(BaseModel):
    to_user_id: int
    listing_id: int
    message: Optional[str] = None
    scheduled_time: Optional[datetime] = None
    duration: Optional[int] = None

class RequestCreate(RequestBase):
    pass

class RequestResponse(RequestBase):
    id: int
    from_user_id: int
    status: str
    created_at: datetime
    
    class Config:
        from_attributes = True

# ============= Review Schemas =============
class ReviewBase(BaseModel):
    reviewed_id: int
    rating: float = Field(ge=1, le=5)
    comment: Optional[str] = None

class ReviewCreate(ReviewBase):
    request_id: Optional[int] = None

class ReviewResponse(ReviewBase):
    id: int
    reviewer_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# ============= Community Post Schemas =============
class PostBase(BaseModel):
    content: str
    image_url: Optional[str] = None

class PostCreate(PostBase):
    pass

class PostResponse(PostBase):
    id: int
    user_id: int
    likes: int
    comments_count: int
    created_at: datetime
    user: UserResponse
    
    class Config:
        from_attributes = True

class CommentBase(BaseModel):
    content: str

class CommentCreate(CommentBase):
    post_id: int

class CommentResponse(CommentBase):
    id: int
    post_id: int
    user_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# ============= Video Schemas =============
class VideoBase(BaseModel):
    title: str
    description: Optional[str] = None
    video_url: str
    thumbnail_url: Optional[str] = None
    duration: Optional[str] = None
    category: Optional[str] = None
    level: Optional[str] = None
    tags: List[str] = []

class VideoCreate(VideoBase):
    pass

class VideoResponse(VideoBase):
    id: int
    user_id: int
    views: int
    likes: int
    status: str
    created_at: datetime
    user: UserResponse # 👇 NEW: Add this field

    class Config:
        from_attributes = True

# ============= Chat Schemas =============
class ChatMessageBase(BaseModel):
    content: str
    message_type: str = "text"

class ChatMessageCreate(ChatMessageBase):
    room_id: str

class ChatMessageResponse(ChatMessageBase):
    id: int
    room_id: str
    sender_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# ============= Leaderboard Schemas =============
class LeaderboardEntry(BaseModel):
    rank: int
    user: UserResponse
    weekly_gain: int = 0
    specialties: List[str] = []
    
    class Config:
        from_attributes = True

# ============= Generic Response =============
class MessageResponse(BaseModel):
    message: str
    detail: Optional[str] = None