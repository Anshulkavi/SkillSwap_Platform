# from fastapi import APIRouter, Depends, HTTPException, status
# from sqlalchemy.orm import Session

# from models.database import get_db
# from models.models import User
# from schemas import UserCreate, Token
# from auth.dependencies import (
#     get_password_hash,
#     create_access_token,
#     create_refresh_token
# )

# router = APIRouter()

# @router.post("/signup", response_model=Token, status_code=status.HTTP_201_CREATED)
# async def signup(
#     user_data: UserCreate,
#     db: Session = Depends(get_db)
# ):
#     """User registration endpoint"""
#     existing_user = db.query(User).filter(User.email == user_data.email).first()
#     if existing_user:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Email already registered"
#         )
    
#     hashed_password = get_password_hash(user_data.password)
#     new_user = User(
#         name=user_data.name,
#         email=user_data.email,
#         password=hashed_password
#         # You can set other default values here if needed
#     )
    
#     db.add(new_user)
#     db.commit()
#     db.refresh(new_user)
    
#     # 👇 THE FIX: Convert new_user.id to a string before creating the token
#     access_token = create_access_token(
#         data={"sub": str(new_user.id), "email": new_user.email}
#     )
#     refresh_token = create_refresh_token(
#         data={"sub": str(new_user.id), "email": new_user.email}
#     )
    
#     return {
#         "access_token": access_token,
#         "refresh_token": refresh_token,
#         "token_type": "bearer",
#         "user": new_user
#     }

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from models.database import get_db
from models.models import User
from schemas import UserCreate, Token
from auth.dependencies import (
    get_password_hash,
    create_access_token,
    create_refresh_token
)

router = APIRouter()


@router.post("/signup", response_model=Token, status_code=status.HTTP_201_CREATED)
async def signup(
    user_data: UserCreate,
    db: Session = Depends(get_db)
):
    """User registration endpoint"""

    # 🔒 Step 1: Check if email already exists
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # 🔑 Step 2: Check password length (bcrypt limit)
    if len(user_data.password) > 72:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password too long (max 72 characters)"
        )

    # 🔐 Step 3: Hash the password safely
    hashed_password = get_password_hash(user_data.password)

    # 👤 Step 4: Create and store new user
    new_user = User(
        name=user_data.name,
        email=user_data.email,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # 🪪 Step 5: Generate JWT tokens
    access_token = create_access_token(
        data={"sub": str(new_user.id), "email": new_user.email}
    )
    refresh_token = create_refresh_token(
        data={"sub": str(new_user.id), "email": new_user.email}
    )

    # ✅ Step 6: Return tokens and user info
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user": {
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email,
        }
    }