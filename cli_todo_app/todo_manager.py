"""
Todo manager for handling task operations
"""

from typing import List, Optional
from datetime import datetime
from models import Task


class TodoManager:
    """Manages todo tasks in memory"""
    
    def __init__(self):
        """Initialize an empty todo list"""
        self.tasks: List[Task] = []
        self.next_id: int = 1
    
    def add_task(self, title: str, description: str = "") -> Task:
        """
        Add a new task to the todo list
        
        Args:
            title: Task title
            description: Task description (optional)
            
        Returns:
            The created task
        """
        task = Task(
            id=self.next_id,
            title=title.strip(),
            description=description.strip()
        )
        self.tasks.append(task)
        self.next_id += 1
        return task
    
    def delete_task(self, task_id: int) -> bool:
        """
        Delete a task by ID
        
        Args:
            task_id: ID of the task to delete
            
        Returns:
            True if task was deleted, False if not found
        """
        for i, task in enumerate(self.tasks):
            if task.id == task_id:
                del self.tasks[i]
                return True
        return False
    
    def update_task(self, task_id: int, title: Optional[str] = None, 
                   description: Optional[str] = None) -> Optional[Task]:
        """
        Update a task's details
        
        Args:
            task_id: ID of the task to update
            title: New title (optional)
            description: New description (optional)
            
        Returns:
            Updated task if found, None otherwise
        """
        for task in self.tasks:
            if task.id == task_id:
                task.update(title, description)
                return task
        return None
    
    def get_task(self, task_id: int) -> Optional[Task]:
        """
        Get a task by ID
        
        Args:
            task_id: ID of the task to retrieve
            
        Returns:
            The task if found, None otherwise
        """
        for task in self.tasks:
            if task.id == task_id:
                return task
        return None
    
    def get_all_tasks(self) -> List[Task]:
        """
        Get all tasks
        
        Returns:
            List of all tasks
        """
        return self.tasks.copy()
    
    def get_completed_tasks(self) -> List[Task]:
        """
        Get all completed tasks
        
        Returns:
            List of completed tasks
        """
        return [task for task in self.tasks if task.completed]
    
    def get_pending_tasks(self) -> List[Task]:
        """
        Get all pending tasks
        
        Returns:
            List of pending tasks
        """
        return [task for task in self.tasks if not task.completed]
    
    def mark_task_complete(self, task_id: int) -> Optional[Task]:
        """
        Mark a task as complete
        
        Args:
            task_id: ID of the task to mark complete
            
        Returns:
            Updated task if found, None otherwise
        """
        task = self.get_task(task_id)
        if task:
            task.mark_complete()
        return task
    
    def mark_task_incomplete(self, task_id: int) -> Optional[Task]:
        """
        Mark a task as incomplete
        
        Args:
            task_id: ID of the task to mark incomplete
            
        Returns:
            Updated task if found, None otherwise
        """
        task = self.get_task(task_id)
        if task:
            task.mark_incomplete()
        return task
    
    def clear_all_tasks(self):
        """Clear all tasks from the todo list"""
        self.tasks.clear()
        self.next_id = 1
    
    def get_task_count(self) -> tuple[int, int, int]:
        """
        Get counts of all, completed, and pending tasks
        
        Returns:
            Tuple of (total, completed, pending) counts
        """
        total = len(self.tasks)
        completed = len(self.get_completed_tasks())
        pending = total - completed
        return total, completed, pending