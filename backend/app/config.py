import os
from pathlib import Path
from pydantic_settings import BaseSettings

# Project directories
this_dir = Path(__file__).resolve().parent
PROJECT_ROOT = this_dir.parent
DATA_DIR = PROJECT_ROOT / "data"

# File paths
USERS_PATH = DATA_DIR / "users.txt"
MESSAGES_PATH = DATA_DIR / "messages.txt"

# Security settings
SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")  # salt for hashing
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "120"))

class Settings(BaseSettings):
    frontend_base_url: str = "http://localhost:5173"

    class Config:
        env_file = ".env"

settings = Settings()