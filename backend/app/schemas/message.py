from pydantic import BaseModel

class MessageIn(BaseModel):
    userID: str
    message: str

class Message(BaseModel):
    id: int
    userID: str
    message: str