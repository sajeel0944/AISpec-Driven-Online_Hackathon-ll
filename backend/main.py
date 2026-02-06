from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from ai_workflow.assistant import stream_agent_response
from schema.api_type import AddTodoEndpointSchema, DeleteTodoEndpointSchema, LoginEndpointSchema, RegisterEndpointSchema, UpdateTodoEndpointSchema, VerifyEndpointSchema
from schema.context_type import todoAgentApiSchema
from todos import Todo
from auth.auth import Auth
from sse_starlette.sse import EventSourceResponse

# --------------------------------------------------------------------

app = FastAPI()

# --------------------------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://ai-spec-driven-online-hackathon-ll-one.vercel.app"],
    allow_methods=["GET", "POST", "DELETE", "OPTIONS", "PUT"],
    allow_headers=["*"],
    allow_credentials=True,
)

# --------------------------------------------------------------------

@app.post("/register")
def register_endpoint(payload: RegisterEndpointSchema):
    try:
        auth_instance = Auth(
            email=payload.email,
            password=payload.password,
            firstName=payload.firstName,
            lastName=payload.lastName,
            profilePictureURL=payload.profilePictureURL
        )
        result = auth_instance.register_user()
        return result
    except Exception as e:
        print(e)
        return {"status": "error", "message": "Something went wrong"}
    
# --------------------------------------------------------------------

@app.post("/verify")
def verify_endpoint(payload: VerifyEndpointSchema):
    try:
        auth_instance = Auth(
            email=payload.email,
            otp=payload.otp
        )
        result = auth_instance.verify_user()
        return result
    except Exception as e:
        print(e)
        return {"status": "error", "message": "Something went wrong"}
    
# --------------------------------------------------------------------

@app.post("/login")
def login_endpoint(payload: LoginEndpointSchema):
    try:
        auth_instance = Auth(
            email=payload.email,
            password=payload.password
        )
        result = auth_instance.login_user()
        return result
    except Exception as e:
        print(e)
        return {"status": "error", "message": "Something went wrong"}

# --------------------------------------------------------------------

@app.post("/add_todo")
def add_todo_endpoint(payload: AddTodoEndpointSchema):
    try:
        todo_instance = Todo(email=payload.email, todo=payload.todo)
        result = todo_instance.add_todo()
        return result
    except Exception as e:
        print(e)
        return {"status": "error", "message": "Something went wrong"}
    
# --------------------------------------------------------------------

@app.get("/get_todos")
def get_todos_endpoint(email: str):
    try:
        todo_instance = Todo(email=email)
        result = todo_instance.get_todos()
        return result
    except Exception as e:
        print(e)
        return []
    
# --------------------------------------------------------------------

@app.put("/update_todo")
def update_todo_endpoint(payload: UpdateTodoEndpointSchema):
    try:
        todo_instance = Todo(email=payload.email, updated_data=payload.updated_data)
        result = todo_instance.update_todo()
        return result
    except Exception as e:
        print(e)
        return {"status": "error", "message": "Something went wrong"}
    
# --------------------------------------------------------------------

@app.delete("/delete_todo")
def delete_todo_endpoint(payload: DeleteTodoEndpointSchema):
    try:
        todo_instance = Todo(email= payload.email, todo_id= payload.todo_id)
        result = todo_instance.delete_todo()
        return result
    except Exception as e:
        print(e)
        return {"status": "error", "message": "Something went wrong"}
    
# --------------------------------------------------------------------


@app.post("/todo/agent")
async def todo_agent_api(payload: todoAgentApiSchema):
    """
    Frontend must send JSON:
    {
        "user_que": { ... AiMessage ... },
        "user_data": { ... userInfoSchema ... }
    }
    """
    try:
        user_que = payload.user_message
        user_data = payload.user_data

        if not user_que or not user_data:
            return "user_que and user_data are required"

        return EventSourceResponse(
            stream_agent_response(user_que, user_data),
            media_type="text/event-stream"
        )
    except Exception as e:
        print(e)
        return "An error occurred while processing your request."