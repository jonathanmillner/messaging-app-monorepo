from fastapi import APIRouter, Depends
from app.schemas.auth import LoginResponse
from app.utils.security import get_current_user

router = APIRouter()

@router.post('/login', response_model=LoginResponse)
def login(user: dict = Depends(get_current_user)):
    # Validates creds via HTTP Basic and returns user info
    return user