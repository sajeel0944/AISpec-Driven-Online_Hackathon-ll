from typing import Dict, List
from agents import RunContextWrapper, function_tool
from schema.context_type import UserDetails
from schema.todo_type import AddTodoSchema, TodoSchema
from todos import Todo


@function_tool
def user_details(ctx: RunContextWrapper[UserDetails]) -> str:
    """
    ## Get User Details

    Retrieves the authenticated user's basic personal information.

    ### Data Returned
    The function returns a formatted string containing:
    - **Email**
    - **First Name**
    - **Last Name**

    ### Returns
    - `str`:  
      A string in the format:  
      `Email: <email>, First Name: <firstName>, Last Name: <lastName>`

    ### Error Handling
    - If user details are unavailable or an error occurs,  
      the function returns `"Not found"` and logs the error.
    """
    try:
        
      return f"User Details - Email: {ctx.context.email}, First Name: {ctx.context.firstName}, Last Name: {ctx.context.lastName}"
    except Exception as e:
        print(f"Error in user_details: {e}")
        return "Not found"


@function_tool
def read_todos(ctx: RunContextWrapper[UserDetails]) -> List[Dict]:
    """
    ## Read User Todos

    Retrieve all todo items associated with a specific user email.

    This function is designed for agent usage. The agent should call
    this function when it needs to fetch or display the user's existing
    todo list from the data source.

    ### Returns
    - **List[Dict]**:  
      A list of todo objects. Each todo is represented as a dictionary
      containing details such as title, description, status, etc.  
      If an error occurs, an empty list is returned.

    ### Usage Notes
    - Safe to call multiple times.
    - Returns an empty list if no todos are found or an exception occurs.
    """
    try:
        todo_instance = Todo(email=ctx.context.email)
        return f"""{todo_instance.get_todos()}"""
    except Exception as e:
        print(f"Error in read_todos: {e}")
        return f"""{[]}"""

# --------------------------------------------------------------------

@function_tool
def add_todo(ctx: RunContextWrapper[UserDetails], todo_data: AddTodoSchema) -> Dict:
    """
    ## Add New Todo

    Create and store a new todo item for a specific user.

    This function is intended for agent usage. The agent should call
    this function when the user wants to create a new todo item.
    The todo data must follow the `AddTodoSchema`.

    ### Parameters
    - **todo_data** (`AddTodoSchema`):  
      Structured todo information containing:
      - **title** (`str`): Title of the todo (required)
      - **description** (`str | None`): Optional description
      - **status** (`TodoStatus`):  
        One of: `Pending`, `In Progress`, `Completed`  
        *(Default: Pending)*
      - **priority** (`TodoPriority`):  
        One of: `Low`, `Medium`, `High`  
        *(Default: Medium)*
      - **created_at** (`str`): Todo creation date/time (ISO string recommended)
      - **due_date** (`str`): Todo due date/time (ISO string recommended)
      - **tags** (`List[str] | None`): Optional list of tags

    ### Returns
    - **Dict**:  
      On success, returns a dictionary containing the newly created todo
      or a success status.  
      On failure, returns:
      ```json
      {
        "status": "error",
        "message": "<error details>"
      }
      ```

    ### Usage Notes
    - Ensure all required fields are provided in `todo_data`.
    - Enum values must match exactly as defined.
    - This function handles exceptions internally and never raises them.
    """
    try:
        todo_instance = Todo(email=ctx.context.email, todo=todo_data)
        return f"""{todo_instance.add_todo()}"""
    except Exception as e:
        print(f"Error in add_todo: {e}")
        return "Not Found"
    
# --------------------------------------------------------------------

@function_tool
def update_todo(ctx: RunContextWrapper[UserDetails], updated_todo_data: TodoSchema) -> Dict:
    """
    ## Update Existing Todo

    Update an existing todo item for a specific user using the provided
    todo data. The todo is identified by its unique `id`.

    This function is intended for agent usage. The agent should call
    this function when the user wants to modify an existing todo
    (e.g., change title, status, priority, due date, etc.).

    ### Parameters
    - **updated_todo_data** (`TodoSchema`):  
      Complete todo object containing updated values:
      - **id** (`int`): Unique identifier of the todo (required)
      - **title** (`str`): Updated title
      - **description** (`str | None`): Optional updated description
      - **status** (`TodoStatus`):  
        One of: `Pending`, `In Progress`, `Completed`
      - **priority** (`TodoPriority`):  
        One of: `Low`, `Medium`, `High`
      - **created_at** (`str`): Original creation date/time
      - **due_date** (`str`): Updated due date/time
      - **tags** (`List[str] | None`): Optional list of tags

    ### Returns
    - **Dict**:  
      On success, returns a dictionary containing the updated todo
      or a success status.  
      On failure, returns:
      ```json
      {
        "status": "error",
        "message": "<error details>"
      }
      ```

    ### Usage Notes
    - The `id` field is mandatory and used to locate the todo.
    - All fields should be provided; partial updates are not supported.
    - Enum values must match exactly as defined.
    - This function handles exceptions internally and does not raise them.
    """
    try:
        todo_instance = Todo(email=ctx.context.email, updated_data=updated_todo_data)
        return f"""{todo_instance.update_todo()}"""
    except Exception as e:
        print(f"Error in update_todo: {e}")
        return "Not Found"
    
# --------------------------------------------------------------------

@function_tool
def delete_todo(ctx: RunContextWrapper[UserDetails], todo_id: int) -> Dict:
    """
    ## Delete Todo

    Delete an existing todo item for a specific user using the todo ID.

    This function is intended for agent usage. The agent should call
    this function when the user explicitly requests to delete or remove
    a todo item.

    ### Parameters
    - **todo_id** (`int`):  
      Unique identifier of the todo item to be deleted.

    ### Returns
    - **Dict**:  
      On success, returns a dictionary indicating successful deletion
      (or the deleted todo data, depending on implementation).  
      On failure, returns:
      ```json
      {
        "status": "error",
        "message": "<error details>"
      }
      ```

    ### Usage Notes
    - The `todo_id` must refer to an existing todo owned by the user.
    - This action is irreversible.
    - Safe to call only after user confirmation.
    - This function handles exceptions internally and does not raise them.
    """
    try:
        todo_instance = Todo(email=ctx.context.email, todo_id=todo_id)
        return f"""{todo_instance.delete_todo()}"""
    except Exception as e:
        print(f"Error in delete_todo: {e}")
        return "Not Found"