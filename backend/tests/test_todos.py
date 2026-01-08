import sys
from pathlib import Path
import rich

# ensure project root is on sys.path so imports like `schemas` work
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from schema.todo_type import AddTodoSchema, TodoSchema
from todos import Todo

def test_todo_crud_operations() -> None:
    rich.print("[bold magenta]--- TESTING TODO CRUD OPERATIONS ---[/bold magenta]")

    # --- Sample todo data ---
    todo_data = {
        "title": "Finish homework",
        "description": "Math and Science",
        "status": "In Pending",
        "priority": "Medium",
        "created_at": "2025-12-25 12:00:00",
        "due_date": "2025-12-26",
        "tags": ["school", "urgent"],
    }

    # --- Create Todo object ---
    test_todo = Todo(
        email="testuser@example.com",
        todo=AddTodoSchema(**todo_data)
    )

    # -------------------------------------------------
    # 1️⃣ ADD TODO
    # -------------------------------------------------

    add_response = test_todo.add_todo()
    print("[green]Add Todo Response:[/green]")
    print(add_response)


    # -------------------------------------------------
    # 2️⃣ READ TODOS
    # -------------------------------------------------

    get = test_todo.get_todos()
    print("\n[cyan]Todos Retrieved:[/cyan]")
    print(get)


    # -------------------------------------------------
    # 3️⃣ UPDATE TODO
    # -------------------------------------------------

    updated_todo_data = {
        "id": 5,
        "title": "Finish homework (UPDATED)",
        "description": "Math, Science and English",
        "status": "completed",              
        "priority": "high",                 
        "created_at": "2025-12-25 12:00:00",
        "due_date": "2025-12-30",  
        "tags": ["school", "done"] 
    }

    update_service = Todo(
        email="testuser@example.com",
        updated_data=TodoSchema(**updated_todo_data)
    )

    update_response = update_service.update_todo()
    print("\n[yellow]Update Todo Response:[/yellow]")
    print(update_response)


    # -------------------------------------------------
    # 2️⃣ DELETE FIRST TODO
    # -------------------------------------------------

    delete_service = Todo(
        email="testuser@example.com",
        todo_id=1
    )

    delete_response = delete_service.delete_todo()
    print("\n[yellow]Delete Todo Response:[/yellow]")
    print(delete_response)

if __name__ == "__main__":
    test_todo_crud_operations()