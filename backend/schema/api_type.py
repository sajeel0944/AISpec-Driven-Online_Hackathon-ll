import sys
from pathlib import Path
from typing import Optional

# ensure project root is on sys.path so imports like `schema` work
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from pydantic import BaseModel
from schema.todo_type import AddTodoSchema, TodoSchema

class RegisterEndpointSchema(BaseModel):
    email: str
    password: str
    firstName: str
    lastName: str
    profilePictureURL: Optional[str] = None

class VerifyEndpointSchema(BaseModel):
    email: str
    otp: str

class LoginEndpointSchema(BaseModel):
    email: str
    password: str

class AddTodoEndpointSchema(BaseModel):
    email: str
    todo: AddTodoSchema

class UpdateTodoEndpointSchema(BaseModel):
    email: str
    updated_data: TodoSchema

class DeleteTodoEndpointSchema(BaseModel):
    email: str
    todo_id: int