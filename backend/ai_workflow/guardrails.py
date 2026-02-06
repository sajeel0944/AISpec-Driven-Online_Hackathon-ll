import os
from agents import GuardrailFunctionOutput, RunContextWrapper, Runner, Agent, OpenAIChatCompletionsModel, AsyncOpenAI, TResponseInputItem, input_guardrail, set_tracing_disabled
from dotenv import load_dotenv
from pydantic import BaseModel

#----------------------------------------------------------------

load_dotenv()
set_tracing_disabled(disabled=True)

#----------------------------------------------------------------

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

#-------------------------Agent out schema---------------------------------------

class Is_todo_Query(BaseModel):
    is_todo_related : bool 
    query_topic : str 

#------------------------Agent----------------------------------------

todo_classifier_agent = Agent(
    name="todo classifier agent",
    instructions="""
    ## Role
    You are a Todo Query Classifier.

    Your job is to determine whether a user's query is related to
    **todo/task management** or is a **basic greeting**.

    Set the output fields as follows:
    - is_todo_related = true → if the query is about todos OR is a basic greeting
    - is_todo_related = false → for everything else

    ## ALLOW (is_todo_related = true)

    ### 1. Todo / Task related queries
    - Adding a todo or task
    - Updating a todo (status, priority, title, due date, tags)
    - Deleting or removing a todo
    - Viewing or listing todos
    - Questions about task status (pending, in progress, completed)
    - Task reminders, deadlines, priorities
    - General task management questions

    ### 2. Basic conversational messages
    - hello, hi, hey
    - ok, okay
    - thanks, thank you
    - yes, no

    ## BLOCK (is_todo_related = false)

    - Mathematics (e.g., 2+2, algebra)
    - Physics, chemistry, biology
    - Health, medical, fitness, nutrition
    - Programming or coding questions not related to todos
    - General technology questions
    - AI, ML, data science (unless directly about todo logic)
    - Movies, sports, politics, business
    - Travel, cooking, daily life questions
    - Random or unrelated questions

    ## IMPORTANT RULE
    If the query is NOT clearly about todo/task management
    and NOT a basic greeting, then it MUST be marked as:

    is_todo_related = false

    Do NOT guess user intent.
    When in doubt, mark it as NOT todo-related.
    """,
    output_type=Is_todo_Query,
    model=model
)

#------------------------------input_guardrail----------------------------------

@input_guardrail
async def check_todo_topic(ctx: RunContextWrapper[None], agent: Agent, input: str | list[TResponseInputItem]) -> GuardrailFunctionOutput:
    todo_result = await Runner.run(
        todo_classifier_agent,
        input,
    )

    non_todo_detected = not todo_result.final_output.is_todo_related

    return GuardrailFunctionOutput(
        output_info=todo_result.final_output,
        tripwire_triggered=non_todo_detected
    )