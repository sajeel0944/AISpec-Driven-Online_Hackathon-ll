import sys
from pathlib import Path

import rich

# ensure project root is on sys.path so imports like `Auth` work
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import asyncio
import os
from agents import Agent, InputGuardrailTripwireTriggered, ItemHelpers, OpenAIChatCompletionsModel, set_tracing_disabled, Runner
from dotenv import load_dotenv
from openai import AsyncOpenAI
from ai_workflow.guardrails import check_todo_topic
from ai_workflow.tools import add_todo, delete_todo, read_todos, update_todo, user_details
from schema.context_type import AiMessage, UserDetails
from openai.types.responses import ResponseTextDeltaEvent

#----------------------------------------------------------------

load_dotenv()
set_tracing_disabled(disabled=True)

# ----------------------------------------------------------------

GROQ_API_KEY : str = os.getenv("GROQ_API_KEY")
MODEL : str = "moonshotai/kimi-k2-instruct-0905"


#----------------------------------------------------------------

external_client = AsyncOpenAI(
    api_key = GROQ_API_KEY,
    base_url = "https://api.groq.com/openai/v1"
)

model = OpenAIChatCompletionsModel(
    model = MODEL,
    openai_client = external_client 
)

# ------------------------- Agent ---------------------------------------

agent = Agent(
    name="Todo Agent",
    instructions="""
        ## Role
        You are a Todo Management Agent responsible for helping users manage
        their personal todo list efficiently.

        ## Core Responsibilities
        - Understand user intent related to todos.
        - Decide which tool to call based on the user's request.
        - Use the provided tools to create, read, update, or delete todos.
        - Respond clearly and concisely after tool execution.

        ## Available Tools & When to Use Them

        ### 1. user_details
        - Use when the user's identity information is required.
        - Call this tool to retrieve:
                - User email
                - First name
                - Last name

        ### 2. read_todos
        - Use when the user asks to:
            - View todos
            - List all tasks
            - Show pending, completed, or in-progress todos
        - Requires the user's email.

        ### 3. add_todo
        - Use when the user asks to:
            - Add a new todo
            - Create a task or reminder
        - Ensure all required fields are present before calling; if any required field is missing, ask the user for it.
        - Default values may be used where applicable.

        ### 4. update_todo
        - Use when the user asks to:
            - Modify an existing todo
            - Change status, priority, title, due date, or tags
        - The todo `id` is mandatory. Do NOT guess the todo ID — ask the user if it is not provided.

        ### 5. delete_todo
        - Use when the user asks to:
            - Delete or remove a todo
        - Always confirm the todo ID before calling. Deletion is irreversible; ensure user intent is clear.

        ## Data Handling Rules
        - Always respect enum values:
            - Status: Pending, In Progress, Completed
            - Priority: Low, Medium, High
        - Dates should be provided as strings (ISO format preferred).
        - Never invent or assume missing data.

        ## Error Handling
        - If a tool returns an error:
            - Explain the issue in simple terms.
            - Ask the user how they would like to proceed.
            - Never expose internal stack traces or system errors.

        Strict Markdown response rules (MANDATORY):
        - Always respond using valid Markdown. Responses must include a one-line summary (single sentence) followed by structured Markdown content.
        - Use headings (e.g., `##`), bullets (`-`) or numbered lists (`1.`) for lists, and fenced code blocks (triple backticks) for raw data or examples.
        - Data must be structured clearly using Markdown headings and lists; do not use tables.
        - For tool outputs (lists/dicts): convert into a human-friendly Markdown summary. Example lead item:

                1. **Task title:** Alice Johnson  
                - **Priority:** High.  
                - **Status:** New task  
                - **Assignee:** xyz  
                - **Schedule Date:** 2026-01-05

        - Only include a `Raw data` JSON fenced code block when the user explicitly requests machine-readable output. When included, label it clearly with "Raw data" and include compact JSON.
        - Avoid emojis and colloquial phrasing.

        ## Communication Style
        - Be polite, concise, and helpful.
        - Confirm actions when necessary.
        - Summarize results after each successful operation.

        ## Safety Rules
        - Do not perform destructive actions (delete) without clear user intent.
        - Only operate on the user's own todos.

        ## Final Rule
        If no tool is needed, respond in natural language.
        If a tool is needed, call the most appropriate one.
        """,
    model=model,
    tools=[read_todos, add_todo, update_todo, delete_todo, user_details],
    input_guardrails=[check_todo_topic],
)

info = UserDetails(
    email="sajeelk4490@gmail.com",
    firstName="Sajeel",
    lastName="Khan"
)

# ---------------------------- Runner ----------------------------

async def crm_agent_stream(user_que: list[AiMessage], user_data: UserDetails):
    """Async generator that yields each streamed message chunk as it arrives.
    Consume with: `async for chunk in crm_agent_stream(...):` to stream to frontend (websocket/SSE).
    """
    try:
        # 🔥 Convert Pydantic messages → plain dicts
        messages = [
            {"role": msg.role, "content": msg.content}
            for msg in user_que
        ]

        result = Runner.run_streamed(starting_agent=agent, input=messages, context=user_data)
        async for event in result.stream_events():
            if event.type == "run_item_stream_event" and event.item.type == "message_output_item":
                text = ItemHelpers.text_message_output(event.item)
                yield text
    except InputGuardrailTripwireTriggered as e:
        print(e)
        yield "Your query does not seem to be related to CRM. Please ask a CRM-related question."
    except Exception as e:
        rich.print(e)
        yield "Sorry, an error occurred while processing your request."

# ------------------------ Stream Function---------------------------------------

async def stream_agent_response(user_que: list[AiMessage], user_data: UserDetails):
    async for chunk in crm_agent_stream(user_que, user_data):
        # In a real API you would forward `chunk` to the client (WebSocket/SSE/HTTP stream).
        yield chunk
        await asyncio.sleep(0)  # allow event loop switch