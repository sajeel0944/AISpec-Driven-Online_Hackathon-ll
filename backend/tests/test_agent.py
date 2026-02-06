import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from ai_workflow.assistant import crm_agent_stream
from schema.context_type import AiMessage, UserDetails
import asyncio
import rich

async def main():
    user_que = [
        AiMessage(role="user", content="List my pending tasks")
    ]

    user_data = UserDetails(
        email="sajeel@gmail.com",
        firstName="Sajeel",
        lastName="Ahmed"
    )

    async for chunk in crm_agent_stream(user_que, user_data):
        rich.print(chunk)

if __name__ == "__main__":
    asyncio.run(main())