from pydantic import BaseModel

from typing import Literal

class UserDetails(BaseModel):
    email: str
    firstName: str
    lastName: str

class AiMessage(BaseModel):
  role: Literal["system", "user", "assistant"]
  content: str

class todoAgentApiSchema(BaseModel):
    user_message: list[AiMessage]
    user_data: UserDetails
    