from enum import Enum
from typing import List, Optional
from pydantic import BaseModel
from sqlmodel import SQLModel

class TodoStatus(str, Enum):
    PENDING = 'Pending'
    IN_PROGRESS = 'In Progress'
    COMPLETED = 'Completed'

class TodoPriority(str, Enum):
    LOW = 'Low'
    MEDIUM = 'Medium'
    HIGH = 'High'

class AddTodoSchema(BaseModel):
    title: str
    description: str | None = None
    status: TodoStatus = TodoStatus.PENDING
    priority: TodoPriority = TodoPriority.MEDIUM
    created_at: str
    due_date: str
    tags: Optional[List[str]] = []  

class TodoSchema(BaseModel):
    id: int
    title: str
    description: str | None = None
    status: TodoStatus
    priority: TodoPriority
    created_at: str
    due_date: str
    tags: Optional[List[str]] = []  