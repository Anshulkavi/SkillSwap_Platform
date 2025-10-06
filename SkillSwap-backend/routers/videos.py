# # routers/videos.py
# from fastapi import APIRouter, Depends, HTTPException, status, Query, File, UploadFile, Form
# from sqlalchemy.orm import Session
# from typing import List, Optional
# import cloudinary.uploader

# from models.database import get_db
# from models.models import User, Video
# from schemas import VideoCreate, VideoResponse
# from auth.dependencies import get_current_user

# router = APIRouter()

# @router.post("", response_model=VideoResponse, status_code=status.HTTP_201_CREATED)
# async def upload_video(
#     title: str = Form(...),
#     description: str = Form(...),
#     category: str = Form(...),
#     level: str = Form(...),
#     tags: str = Form(""),
#     file: UploadFile = File(...),
#     current_user: User = Depends(get_current_user),
#     db: Session = Depends(get_db)
# ):
#     """Upload a new video file to Cloudinary and save metadata to DB"""

#     print(f"Uploading video '{title}' for user {current_user.email}")

#     try:
#         # 👇 THE FIX: The function is called 'upload', not 'upload_video'
#         result = cloudinary.uploader.upload(
#             file.file,
#             folder=f"skillswap_videos/{current_user.id}",
#             public_id=f"{file.filename}-{current_user.id}",
#             overwrite=True,
#             resource_type="video" # This tells Cloudinary to treat it as a video
#         )
#     except Exception as e:
#         print(f"Cloudinary upload failed: {e}")
#         raise HTTPException(status_code=500, detail=f"Failed to upload video: {e}")

#     # Create the VideoCreate schema from the form data and Cloudinary result
#     video_data = VideoCreate(
#         title=title,
#         description=description,
#         video_url=result.get("secure_url"),
#         thumbnail_url=result.get("secure_url").replace('.mp4', '.jpg'),
#         duration=str(int(result.get("duration", 0))),
#         category=category,
#         level=level,
#         tags= [t.strip() for t in tags.split(',') if t.strip()]
#     )

#     new_video = Video(
#         user_id=current_user.id,
#         **video_data.dict()
#     )

#     db.add(new_video)
#     current_user.xp += 50
#     db.commit()
#     db.refresh(new_video)
    
#     print(f"Successfully uploaded and saved video ID: {new_video.id}")
#     return new_video

# @router.post("", response_model=VideoResponse, status_code=status.HTTP_201_CREATED)
# async def upload_video(
#     # We now use Form() for text fields and File()/UploadFile for the video file
#     title: str = Form(...),
#     description: str = Form(...),
#     category: str = Form(...),
#     level: str = Form(...),
#     tags: str = Form(""), # Tags will be a comma-separated string from the form
#     file: UploadFile = File(...),
#     current_user: User = Depends(get_current_user),
#     db: Session = Depends(get_db)
# ):
#     """Upload a new video file to Cloudinary and save metadata to DB"""

#     print(f"Uploading video '{title}' for user {current_user.email}")

#     try:
#         # Upload the video to Cloudinary. resource_type="video" is important.
#         result = cloudinary.uploader.upload_video(
#             file.file,
#             folder=f"skillswap_videos/{current_user.id}", # Organize uploads in folders per user
#             public_id=f"{file.filename}-{current_user.id}",
#             overwrite=True,
#             resource_type="video"
#         )
#     except Exception as e:
#         print(f"Cloudinary upload failed: {e}")
#         raise HTTPException(status_code=500, detail=f"Failed to upload video: {e}")

#     # Create the VideoCreate schema from the form data and Cloudinary result
#     video_data = VideoCreate(
#         title=title,
#         description=description,
#         video_url=result.get("secure_url"),
#         thumbnail_url=result.get("secure_url").replace('.mp4', '.jpg'), # Simple thumbnail generation
#         duration=str(int(result.get("duration", 0))),
#         category=category,
#         level=level,
#         tags= [t.strip() for t in tags.split(',') if t.strip()]
#     )

#     new_video = Video(
#         user_id=current_user.id,
#         **video_data.dict()
#     )

#     db.add(new_video)

#     # Award XP
#     current_user.xp += 50

#     db.commit()
#     db.refresh(new_video)
#     print(f"Successfully uploaded and saved video ID: {new_video.id}")
#     return new_video

# @router.get("/{video_id}", response_model=VideoResponse)
# async def get_video(
#     video_id: int,
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user)
# ):
#     """Get specific video by ID"""
#     video = db.query(Video).filter(Video.id == video_id).first()
#     if not video:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Video not found"
#         )
    
#     # Increment view count
#     video.views += 1
#     db.commit()
    
#     return video

# @router.put("/{video_id}", response_model=VideoResponse)
# async def update_video(
#     video_id: int,
#     updates: VideoCreate,
#     current_user: User = Depends(get_current_user),
#     db: Session = Depends(get_db)
# ):
#     """Update own video"""
#     video = db.query(Video).filter(
#         Video.id == video_id,
#         Video.user_id == current_user.id
#     ).first()
    
#     if not video:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Video not found or unauthorized"
#         )
    
#     for field, value in updates.dict().items():
#         setattr(video, field, value)
    
#     db.commit()
#     db.refresh(video)
#     return video

# @router.delete("/{video_id}", status_code=status.HTTP_204_NO_CONTENT)
# async def delete_video(
#     video_id: int,
#     current_user: User = Depends(get_current_user),
#     db: Session = Depends(get_db)
# ):
#     """Delete own video"""
#     video = db.query(Video).filter(
#         Video.id == video_id,
#         Video.user_id == current_user.id
#     ).first()
    
#     if not video:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Video not found or unauthorized"
#         )
    
#     db.delete(video)
#     db.commit()
#     return None

# @router.post("/{video_id}/like")
# async def like_video(
#     video_id: int,
#     current_user: User = Depends(get_current_user),
#     db: Session = Depends(get_db)
# ):
#     """Like a video"""
#     video = db.query(Video).filter(Video.id == video_id).first()
#     if not video:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Video not found"
#         )
    
#     video.likes += 1
#     db.commit()
    
#     return {"message": "Video liked", "likes": video.likes}

# @router.get("/user/{user_id}", response_model=List[VideoResponse])
# async def get_user_videos(
#     user_id: int,
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user)
# ):
#     """Get all videos by a specific user"""
#     videos = db.query(Video).filter(
#         Video.user_id == user_id,
#         Video.status == "published"
#     ).all()
#     return videos


# routers/videos.py

# from fastapi import APIRouter, Depends, HTTPException, status, Query, File, UploadFile, Form
# from sqlalchemy.orm import Session
# from typing import List, Optional
# import cloudinary.uploader

# from models.database import get_db
# from models.models import User, Video
# from schemas import VideoCreate, VideoResponse
# from auth.dependencies import get_current_user

# router = APIRouter()

# @router.get("", response_model=List[VideoResponse])
# async def get_videos(
#     skip: int = Query(0, ge=0),
#     limit: int = Query(50, ge=1, le=100),
#     category: Optional[str] = None,
#     level: Optional[str] = None,
#     search: Optional[str] = None,
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user)
# ):
#     """Get all videos with filters"""
#     query = db.query(Video).filter(Video.status == "published")
    
#     if category:
#         query = query.filter(Video.category == category)
#     if level:
#         query = query.filter(Video.level == level)
#     if search:
#         query = query.filter(
#             (Video.title.ilike(f"%{search}%")) | 
#             (Video.description.ilike(f"%{search}%"))
#         )
    
#     videos = query.order_by(Video.created_at.desc()).offset(skip).limit(limit).all()
#     return videos

# @router.post("", response_model=VideoResponse, status_code=status.HTTP_201_CREATED)
# async def upload_video(
#     title: str = Form(...),
#     description: str = Form(...),
#     category: str = Form(...),
#     level: str = Form(...),
#     tags: str = Form(""),
#     file: UploadFile = File(...),
#     current_user: User = Depends(get_current_user),
#     db: Session = Depends(get_db)
# ):
#     """Upload a new video file to Cloudinary and save metadata to DB"""

#     print(f"Uploading video '{title}' for user {current_user.email}")

#     try:
#         # The correct function is 'upload'
#         result = cloudinary.uploader.upload(
#             file.file,
#             folder=f"skillswap_videos/{current_user.id}",
#             public_id=f"{file.filename}-{current_user.id}",
#             overwrite=True,
#             resource_type="video" # This tells Cloudinary to treat it as a video
#         )
#     except Exception as e:
#         print(f"Cloudinary upload failed: {e}")
#         raise HTTPException(status_code=500, detail=f"Failed to upload video: {e}")

#     # Create the VideoCreate schema from the form data and Cloudinary result
#     video_data = VideoCreate(
#         title=title,
#         description=description,
#         video_url=result.get("secure_url"),
#         thumbnail_url=result.get("secure_url", "").replace('.mp4', '.jpg'),
#         duration=str(int(result.get("duration", 0))),
#         category=category,
#         level=level,
#         tags= [t.strip() for t in tags.split(',') if t.strip()]
#     )

#     new_video = Video(
#         user_id=current_user.id,
#         **video_data.dict()
#     )

#     db.add(new_video)
#     current_user.xp += 50
#     db.commit()
#     db.refresh(new_video)
    
#     print(f"Successfully uploaded and saved video ID: {new_video.id}")
#     return new_video

# @router.get("/{video_id}", response_model=VideoResponse)
# async def get_video(
#     video_id: int,
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user)
# ):
#     """Get specific video by ID"""
#     video = db.query(Video).filter(Video.id == video_id).first()
#     if not video:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Video not found"
#         )
    
#     video.views += 1
#     db.commit()
    
#     return video

# @router.put("/{video_id}", response_model=VideoResponse)
# async def update_video(
#     video_id: int,
#     updates: VideoCreate,
#     current_user: User = Depends(get_current_user),
#     db: Session = Depends(get_db)
# ):
#     """Update own video"""
#     video = db.query(Video).filter(
#         Video.id == video_id,
#         Video.user_id == current_user.id
#     ).first()
    
#     if not video:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Video not found or unauthorized"
#         )
    
#     for field, value in updates.dict(exclude_unset=True).items():
#         setattr(video, field, value)
    
#     db.commit()
#     db.refresh(video)
#     return video

# @router.delete("/{video_id}", status_code=status.HTTP_204_NO_CONTENT)
# async def delete_video(
#     video_id: int,
#     current_user: User = Depends(get_current_user),
#     db: Session = Depends(get_db)
# ):
#     """Delete own video"""
#     video = db.query(Video).filter(
#         Video.id == video_id,
#         Video.user_id == current_user.id
#     ).first()
    
#     if not video:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Video not found or unauthorized"
#         )
    
#     db.delete(video)
#     db.commit()
#     return None

# @router.post("/{video_id}/like")
# async def like_video(
#     video_id: int,
#     current_user: User = Depends(get_current_user),
#     db: Session = Depends(get_db)
# ):
#     """Like a video"""
#     video = db.query(Video).filter(Video.id == video_id).first()
#     if not video:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Video not found"
#         )
    
#     video.likes += 1
#     db.commit()
    
#     return {"message": "Video liked", "likes": video.likes}

# @router.get("/user/{user_id}", response_model=List[VideoResponse])
# async def get_user_videos(
#     user_id: int,
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user)
# ):
#     """Get all videos by a specific user"""
#     videos = db.query(Video).filter(
#         Video.user_id == user_id,
#         Video.status == "published"
#     ).all()
#     return videos

# routers/videos.py

# routers/videos.py

import os
import re
from typing import List, Optional
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session, selectinload
import cloudinary
import cloudinary.uploader
from models.database import get_db
from models.models import User, Video
from schemas import VideoCreate, VideoResponse 
from auth.dependencies import get_current_user
router = APIRouter()

# Cloudinary config
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)

# Utility: sanitize filename
def clean_filename(filename: str) -> str:
    filename = re.sub(r'[^a-zA-Z0-9_\-\.]', '_', filename)
    return filename

# Upload video
@router.post("", response_model=VideoResponse, status_code=status.HTTP_201_CREATED)
async def upload_video(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if not file.content_type.startswith("video/"):
        raise HTTPException(status_code=400, detail="Invalid file type. Only videos are allowed.")

    clean_public_id = clean_filename(file.filename.split(".")[0])

    result = cloudinary.uploader.upload(
        file.file,
        folder=f"skillswap_videos/{current_user.id}",
        public_id=clean_public_id,
        overwrite=True,
        resource_type="video",
        format="mp4"
    )

    # video_url = result.get("secure_url", "").replace("/upload/", "/upload/f_mp4/")
    video_url = result.get("secure_url")


    video = Video(
        title=clean_public_id,
        description="Uploaded via SkillSwap",
        video_url=video_url,
        user_id=current_user.id
    )
    db.add(video)
    db.commit()
    db.refresh(video)

    return video   # 👈 will be serialized by VideoResponse

# Get videos with filters
@router.get("", response_model=List[VideoResponse])
async def get_videos(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    category: Optional[str] = None,
    level: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(Video).filter(Video.status == "published")

    if category:
        query = query.filter(Video.category == category)
    if level:
        query = query.filter(Video.level == level)
    if search:
        query = query.filter(
            (Video.title.ilike(f"%{search}%")) |
            (Video.description.ilike(f"%{search}%"))
        )

    videos = query.order_by(Video.created_at.desc()).offset(skip).limit(limit).all()
    return videos

# Get a single video
@router.get("/{video_id}", response_model=VideoResponse)
async def get_video(
    video_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    video = db.query(Video).options(selectinload(Video.user)).filter(Video.id == video_id).first()
    
    if not video:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Video not found")

    if video.user_id != current_user.id:
        video.views += 1
        db.commit()

    return video

# ✅ Only one delete endpoint (cleaned)
@router.delete("/{video_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_video(
    video_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    video = db.query(Video).filter(
        Video.id == video_id,
        Video.user_id == current_user.id
    ).first()

    if not video:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Video not found or unauthorized")

    # Delete from Cloudinary
    if video.video_url and "cloudinary" in video.video_url:
        try:
            # Extract public_id safely
            # Example: https://res.cloudinary.com/demo/video/upload/f_mp4/skillswap_videos/12345/myvideo.mp4
            path_parts = video.video_url.split("/upload/")[-1]
            public_id = os.path.splitext(path_parts.replace("f_mp4/", ""))[0]  # remove f_mp4 and .mp4

            cloudinary.uploader.destroy(public_id, resource_type="video")
        except Exception as e:
            print(f"Could not delete video from Cloudinary: {e}")

    db.delete(video)
    db.commit()
    return None

# Update video
@router.put("/{video_id}", response_model=VideoResponse)
async def update_video(
    video_id: int,
    updates: VideoCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    video = db.query(Video).filter(
        Video.id == video_id,
        Video.user_id == current_user.id
    ).first()

    if not video:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Video not found or unauthorized")

    for field, value in updates.dict(exclude_unset=True).items():
        setattr(video, field, value)

    db.commit()
    db.refresh(video)
    return video

# Like a video
@router.post("/{video_id}/like")
async def like_video(
    video_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    video = db.query(Video).filter(Video.id == video_id).first()
    if not video:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Video not found")

    video.likes += 1
    db.commit()

    return {"message": "Video liked", "likes": video.likes}

# Get all videos by user
@router.get("/user/{user_id}", response_model=List[VideoResponse])
async def get_user_videos(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    videos = db.query(Video).filter(
        Video.user_id == user_id,
        Video.status == "published"
    ).all()
    return videos
