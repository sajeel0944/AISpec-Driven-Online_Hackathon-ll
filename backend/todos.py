from dataclasses import dataclass
from typing import Dict, List, Optional
from sqlmodel import create_engine, Session, select
import os
from dotenv import load_dotenv
from models.todo import AddTodoNeno, userTodoData
from schema.todo_type import AddTodoSchema, TodoSchema

# --- LOAD ENV VARIABLES ---
load_dotenv()

# --- DATABASE CONNECTION STRING ---
NEON_DB_CONNECTION = os.getenv("NEON_DB_CONNECTION")
engine  = create_engine(NEON_DB_CONNECTION)

# --- TODO CLASS ---

@dataclass
class Todo:
    email: str
    todo: Optional[AddTodoSchema] = None
    todo_id: Optional[int] = None
    updated_data: Optional[TodoSchema] = None

    def add_todo(self) -> Dict:
        try:
            with Session(engine) as session:

                # 🔍 Check if user already exists
                statement = select(userTodoData).where(
                    userTodoData.email == self.email
                )
                user = session.exec(statement).first()

                # 📝 Create todo object
                new_todo = AddTodoNeno(
                    title=self.todo.title,
                    description=self.todo.description,
                    status=self.todo.status,
                    priority=self.todo.priority,
                    created_at=self.todo.created_at,
                    due_date=self.todo.due_date,
                    tags=",".join(self.todo.tags) if self.todo.tags else None
                )

                if user:
                    # ✅ User exists → add todo only
                    user.todos.append(new_todo)
                else:
                    # ➕ User does not exist → create user + todo
                    user = userTodoData(
                        email=self.email,
                        todos=[new_todo]
                    )
                    session.add(user)

                session.commit()

            return {"status": "success", "message": "Todo added successfully."}
        except Exception as e:
            return {"status": "error", "message": str(e)}
        
    def get_todos(self) -> List[Dict]:
        try:
            with Session(engine) as session:
                statement = select(userTodoData).where(
                    userTodoData.email == self.email
                )
                user = session.exec(statement).first()

                if not user:
                    return []

                todos = []
                for todo in user.todos:
                    todos.append({
                        "id": todo.id,
                        "title": todo.title,
                        "description": todo.description,
                        "status": todo.status.value,
                        "priority": todo.priority.value,
                        "created_at": todo.created_at,
                        "due_date": todo.due_date,
                        "tags": todo.tags.split(",") if todo.tags else []
                    })

            return todos
        except Exception as e:
            return []
        
    def update_todo(self) -> Dict:
        try:
            with Session(engine) as session:

                statement = select(userTodoData).where(
                    userTodoData.email == self.email
                )
                user = session.exec(statement).first()

                if not user:
                    return {"status": "error", "message": "User not found."}

                todo = next((t for t in user.todos if t.id == self.updated_data.id), None)
                if not todo:
                    return {"status": "error", "message": "Todo not found."}

                data = self.updated_data

                todo.title = data.title
                todo.description = data.description
                todo.status = data.status
                todo.priority = data.priority
                todo.created_at = data.created_at
                todo.due_date = data.due_date
                todo.tags = ",".join(data.tags) if data.tags else None

                session.commit()

            return {"status": "success", "message": "Todo updated successfully."}

        except Exception as e:
            return {"status": "error", "message": str(e)}
        
    def delete_todo(self) -> Dict:
        try:
            if not self.todo_id:
                return {"status": "error", "message": "Todo ID is required."}

            with Session(engine) as session:

                statement = select(userTodoData).where(
                    userTodoData.email == self.email
                )
                user = session.exec(statement).first()

                if not user:
                    return {"status": "error", "message": "User not found."}

                todo = next((t for t in user.todos if t.id == self.todo_id), None)
                if not todo:
                    return {"status": "error", "message": "Todo not found."}

                session.delete(todo)
                session.commit()

            return {"status": "success", "message": "Todo deleted successfully."}

        except Exception as e:
            return {"status": "error", "message": str(e)}