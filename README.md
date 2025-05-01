# Messaging App

This is a simple full-stack messaging application demonstrating a monorepo setup with a Vite/React/TypeScript frontend and a Python/FastAPI backend.

##  Tech Stack
### Frontend
- Vite
- React
- TypeScript
- Bootstrap 5
- Sass

### Backend
- Python 3
- FastAPI
- Uvicorn

Installation guide for FastAPI can be found here:
https://fastapi.tiangolo.com/#installation

## Prerequisites
- Node.js 18+ and npm (frontend)
- Python 3.10+ and pip (backend)

## Environment Variables
### Frontend (/.env)
```
VITE_API_BASE_URL=http://localhost:8000
```

### Backend (backend/.env)
```
FRONTEND_BASE_URL=http://localhost:5173
```

## Run the app locally
### 1. Clone the repo
```
git clone https://github.com/jonathanmillner/messaging-app-monorepo.git
```

### 2. Backend Setup
#### Create & Activate Virtual Environment
- macOS/Linux:
```
python3 -m venv venv
source venv/bin/activate
```
- Windows (PowerShell)
```
python -m venv venv
.\venv\Scripts\Activate
```

#### Install Python Dependencies
```
pip install fastapi uvicorn passlib python-dotenv
```

#### Run the Server
Make sure you’re in the backend directory (where app/ lives) before starting Uvicorn:
- macOS/Linux:
```
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
- Windows (PowerShell)
```
cd backend
python -m uvicorn app.main:app --reload --port 8000
```
The API will be available at http://localhost:8000.

### 3. Frontend Setup
In the root of the app, open a new terminal window/tab and run:
```
npm install
npm run dev
```
Vite will start on http://localhost:5173 by default.

## Login Credentials
Defined in `backend/data/users.txt` (hashed passwords):
```
| Username | Password  | Role     |
| -------- | --------- | -------- |
| admin    | adminpass | admin    |
| readonly | userpass  | readonly |
```
- **admin**: view & add messages
- **readonly**: view-only access

## Usage
1. Visit **http://localhost:5173** in your browser.
2. Log in with `admin/adminpass` or `readonly/userpass`.
3. Explore or add messages based on your role.