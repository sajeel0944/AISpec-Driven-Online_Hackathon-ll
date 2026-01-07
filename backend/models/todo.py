from typing import List, Optional
from sqlmodel import Relationship, SQLModel, Field
from schema.todo_type import TodoPriority, TodoStatus

class userTodoData(SQLModel, table=True):
    __tablename__ = "user"

    id: Optional[int] = Field(default=None, primary_key=True)
    firstName: str
    lastName: str
    email: str
    password: str
    profilePictureURL: Optional[str] = None
    otp: Optional[str] = None
    is_verified: bool = Field(default=False)
    todos: List["AddTodoNeno"] = Relationship(back_populates="user")

class AddTodoNeno(SQLModel, table=True):
    __tablename__ = "todo"

    id: int = Field(primary_key=True)
    title: str
    description: Optional[str] = None
    status: TodoStatus = Field(default='pending')
    priority: TodoPriority = Field(default='medium')
    created_at: str
    due_date: str
    tags: Optional[str] = None  # comma-separated OR use JSON
    user_id: int = Field(foreign_key="user.id")
    user: Optional[userTodoData] = Relationship(back_populates="todos")
