"""
Task model definition
"""

from dataclasses import dataclass
from datetime import datetime
from typing import Optional


@dataclass
class Task:
    """Represents a single todo task"""
    id: int
    title: str
    description: str
    completed: bool = False
    created_at: datetime = None
    updated_at: datetime = None
    
    def __post_init__(self):
        """Initialize timestamps if not provided"""
        current_time = datetime.now()
        if self.created_at is None:
            self.created_at = current_time
        if self.updated_at is None:
            self.updated_at = current_time
    
    def mark_complete(self):
        """Mark task as completed"""
        self.completed = True
        self.updated_at = datetime.now()
    
    def mark_incomplete(self):
        """Mark task as incomplete"""
        self.completed = False
        self.updated_at = datetime.now()
    
    def update(self, title: Optional[str] = None, description: Optional[str] = None):
        """Update task details"""
        if title is not None:
            self.title = title
        if description is not None:
            self.description = description
        self.updated_at = datetime.now()
    
    def __str__(self):
        """String representation of the task"""
        status = "✓" if self.completed else "✗"
        return f"[{self.id}] {self.title} - {status}"