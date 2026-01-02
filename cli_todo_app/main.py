"""
Command-line interface for the todo app
"""

import sys
from typing import Optional
from todo_manager import TodoManager
from utils import (
    print_header, print_success, print_error, 
    print_warning, get_input, confirm_action,
    print_colored, Fore, Style
)


class TodoCLI:
    """Command-line interface for the todo application"""
    
    def __init__(self):
        """Initialize the CLI with a TodoManager"""
        self.todo_manager = TodoManager()
    
    def run(self):
        """Main application loop"""
        print_colored("Welcome to Todo CLI App!", Fore.CYAN + Style.BRIGHT)
        print_colored("Type 'help' for commands or 'exit' to quit\n", Fore.WHITE)
        
        while True:
            try:
                command = get_input("\nCommand").lower().strip()
                
                if command == 'exit' or command == 'quit':
                    if confirm_action("Exit the application"):
                        print_colored("Goodbye!", Fore.CYAN)
                        break
                
                elif command == 'help':
                    self.show_help()
                
                elif command == 'add' or command == 'a':
                    self.add_task()
                
                elif command == 'list' or command == 'l' or command == '':
                    self.list_tasks()
                
                elif command == 'update' or command == 'u':
                    self.update_task()
                
                elif command == 'delete' or command == 'd':
                    self.delete_task()
                
                elif command == 'complete' or command == 'c':
                    self.mark_task_complete()
                
                elif command == 'incomplete' or command == 'i':
                    self.mark_task_incomplete()
                
                elif command == 'clear':
                    self.clear_tasks()
                
                elif command == 'stats':
                    self.show_stats()
                
                elif command == 'view' or command == 'v':
                    self.view_task_details()
                
                else:
                    print_error(f"Unknown command: {command}")
                    print_colored("Type 'help' for available commands", Fore.WHITE)
            
            except KeyboardInterrupt:
                print_colored("\n\nGoodbye!", Fore.CYAN)
                break
            except Exception as e:
                print_error(f"An error occurred: {str(e)}")
    
    def show_help(self):
        """Display help information"""
        print_header("Available Commands")
        
        commands = [
            ("add, a", "Add a new task"),
            ("list, l", "List all tasks (default command)"),
            ("view, v", "View task details"),
            ("update, u", "Update a task"),
            ("delete, d", "Delete a task"),
            ("complete, c", "Mark task as complete"),
            ("incomplete, i", "Mark task as incomplete"),
            ("stats", "Show task statistics"),
            ("clear", "Clear all tasks"),
            ("help", "Show this help message"),
            ("exit, quit", "Exit the application"),
        ]
        
        for cmd, desc in commands:
            print_colored(f"{cmd:<20} - {desc}", Fore.WHITE)
    
    def add_task(self):
        """Add a new task"""
        print_header("Add New Task")
        
        title = get_input("Title")
        if not title:
            print_error("Title cannot be empty")
            return
        
        description = get_input("Description (optional)", "")
        
        task = self.todo_manager.add_task(title, description)
        print_success(f"Task added successfully (ID: {task.id})")
    
    def list_tasks(self, show_details: bool = False):
        """List all tasks"""
        tasks = self.todo_manager.get_all_tasks()
        
        if not tasks:
            print_warning("No tasks found")
            return
        
        total, completed, pending = self.todo_manager.get_task_count()
        print_header(f"Tasks ({total} total, {completed} completed, {pending} pending)")
        
        for task in tasks:
            status_color = Fore.GREEN if task.completed else Fore.YELLOW
            status_icon = "✓" if task.completed else "✗"
            
            print_colored(f"[{task.id}] {task.title} - {status_icon}", status_color)
            
            if show_details and task.description:
                print_colored(f"   Description: {task.description}", Fore.WHITE)
                print_colored(f"   Created: {task.created_at.strftime('%Y-%m-%d %H:%M')}", 
                             Fore.LIGHTBLACK_EX)
    
    def view_task_details(self):
        """View detailed information about a specific task"""
        tasks = self.todo_manager.get_all_tasks()
        
        if not tasks:
            print_warning("No tasks found")
            return
        
        self.list_tasks(show_details=False)
        
        try:
            task_id = int(get_input("\nEnter task ID to view details"))
        except ValueError:
            print_error("Invalid task ID")
            return
        
        task = self.todo_manager.get_task(task_id)
        if not task:
            print_error(f"Task with ID {task_id} not found")
            return
        
        print_header(f"Task Details - {task.title}")
        
        status = "Completed" if task.completed else "Pending"
        status_color = Fore.GREEN if task.completed else Fore.YELLOW
        
        print_colored(f"ID:          {task.id}", Fore.WHITE)
        print_colored(f"Title:       {task.title}", Fore.WHITE)
        print_colored(f"Status:      {status}", status_color)
        
        if task.description:
            print_colored(f"Description: {task.description}", Fore.WHITE)
        
        print_colored(f"Created:     {task.created_at.strftime('%Y-%m-%d %H:%M:%S')}", 
                     Fore.LIGHTBLACK_EX)
        print_colored(f"Updated:     {task.updated_at.strftime('%Y-%m-%d %H:%M:%S')}", 
                     Fore.LIGHTBLACK_EX)
    
    def update_task(self):
        """Update an existing task"""
        tasks = self.todo_manager.get_all_tasks()
        
        if not tasks:
            print_warning("No tasks found")
            return
        
        self.list_tasks(show_details=False)
        
        try:
            task_id = int(get_input("\nEnter task ID to update"))
        except ValueError:
            print_error("Invalid task ID")
            return
        
        task = self.todo_manager.get_task(task_id)
        if not task:
            print_error(f"Task with ID {task_id} not found")
            return
        
        print_header(f"Update Task - {task.title}")
        
        new_title = get_input(f"New title", task.title)
        new_description = get_input("New description", task.description)
        
        updated_task = self.todo_manager.update_task(
            task_id, 
            new_title if new_title != task.title else None,
            new_description if new_description != task.description else None
        )
        
        if updated_task:
            print_success(f"Task updated successfully")
        else:
            print_error("Failed to update task")
    
    def delete_task(self):
        """Delete a task"""
        tasks = self.todo_manager.get_all_tasks()
        
        if not tasks:
            print_warning("No tasks found")
            return
        
        self.list_tasks(show_details=False)
        
        try:
            task_id = int(get_input("\nEnter task ID to delete"))
        except ValueError:
            print_error("Invalid task ID")
            return
        
        task = self.todo_manager.get_task(task_id)
        if not task:
            print_error(f"Task with ID {task_id} not found")
            return
        
        if confirm_action(f"Delete task '{task.title}'?"):
            if self.todo_manager.delete_task(task_id):
                print_success(f"Task deleted successfully")
            else:
                print_error("Failed to delete task")
    
    def mark_task_complete(self):
        """Mark a task as complete"""
        self._mark_task_status(complete=True)
    
    def mark_task_incomplete(self):
        """Mark a task as incomplete"""
        self._mark_task_status(complete=False)
    
    def _mark_task_status(self, complete: bool):
        """Mark a task as complete or incomplete"""
        tasks = self.todo_manager.get_all_tasks()
        
        if not tasks:
            print_warning("No tasks found")
            return
        
        # Show pending tasks for complete, completed tasks for incomplete
        if complete:
            filtered_tasks = self.todo_manager.get_pending_tasks()
            action = "complete"
        else:
            filtered_tasks = self.todo_manager.get_completed_tasks()
            action = "incomplete"
        
        if not filtered_tasks:
            status = "pending" if complete else "completed"
            print_warning(f"No {status} tasks found")
            return
        
        print_header(f"Mark Task as {action.capitalize()}")
        for task in filtered_tasks:
            print_colored(f"[{task.id}] {task.title}", Fore.WHITE)
        
        try:
            task_id = int(get_input(f"\nEnter task ID to mark as {action}"))
        except ValueError:
            print_error("Invalid task ID")
            return
        
        if complete:
            task = self.todo_manager.mark_task_complete(task_id)
        else:
            task = self.todo_manager.mark_task_incomplete(task_id)
        
        if task:
            print_success(f"Task marked as {action}")
        else:
            print_error(f"Task not found or already {action}")
    
    def clear_tasks(self):
        """Clear all tasks"""
        tasks = self.todo_manager.get_all_tasks()
        
        if not tasks:
            print_warning("No tasks to clear")
            return
        
        if confirm_action("Clear ALL tasks? This cannot be undone"):
            self.todo_manager.clear_all_tasks()
            print_success("All tasks cleared")
    
    def show_stats(self):
        """Display task statistics"""
        total, completed, pending = self.todo_manager.get_task_count()
        
        print_header("Task Statistics")
        
        print_colored(f"Total Tasks:    {total}", Fore.WHITE)
        print_colored(f"Completed:      {completed}", Fore.GREEN)
        print_colored(f"Pending:        {pending}", Fore.YELLOW)
        
        if total > 0:
            completion_rate = (completed / total) * 100
            print_colored(f"Completion:     {completion_rate:.1f}%", Fore.CYAN)


def main():
    """Main entry point for the application"""
    cli = TodoCLI()
    cli.run()


if __name__ == "__main__":
    main()