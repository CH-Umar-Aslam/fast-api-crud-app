from pydantic import BaseModel
from typing import List, Optional

# Pydantic model for Idea
class Idea(BaseModel):
    id: Optional[int] = None
    title: str
    description: str
    tags: Optional[str] = None

