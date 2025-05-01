from passlib.context import CryptContext
from typing import Dict

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials

from app.config import USERS_PATH
from app.utils.storage import read_users

security = HTTPBasic()
pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

def hash_password(password: str) -> str:
    # Generate a bcrypt hash
    return pwd_context.hash(password)

def verify_password(password: str, hashed: str) -> bool:
    # Verify a plain password against the stored bcrypt hash.
    return pwd_context.verify(password, hashed)

def get_current_user(
        creds: HTTPBasicCredentials = Depends(security)
) -> Dict[str, str]:
    users = read_users(USERS_PATH)
    user = next((u for u in users if u['username'] == creds.username), None)

    if not user or not verify_password(creds.password, user['hashed_password']):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalid credentials',
            headers={'WWW-Authenticate': 'Basic'},
        )

    return { 'username': user['username'], 'role': user['role'] }