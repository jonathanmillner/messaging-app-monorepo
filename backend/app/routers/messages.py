from fastapi import APIRouter, Depends, HTTPException, status

from app.schemas.message import MessageIn, Message
from app.utils.storage import read_messages, write_messages
from app.config import MESSAGES_PATH
from app.utils.security import get_current_user

router = APIRouter()

@router.get('/messages', response_model=list[Message])
def list_messages(user: dict = Depends(get_current_user)):
    # Return all messages for any authenticated user
    return read_messages(MESSAGES_PATH)

@router.post('/messages', response_model=Message, status_code=status.HTTP_201_CREATED)
def add_message(
        msg: MessageIn,
        user: dict = Depends(get_current_user)
):
    # Allow only admin users to add new messages
    if user['role'] != 'admin':
        raise HTTPException(status_code=403, detail='Admins only')

    msgs = read_messages(MESSAGES_PATH)
    next_id = max((m['id'] for m in msgs), default=0) + 1
    new_msg = { 'id': next_id, 'userID': msg.userID, 'message': msg.message }

    write_messages(MESSAGES_PATH, msgs + [new_msg])
    return new_msg