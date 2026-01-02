"""
Utility functions for the todo app
"""

import sys
from typing import Optional
from colorama import Fore, Style, init

# Initialize colorama for cross-platform colored output
init(autoreset=True)


def print_colored(text: str, color: str = Fore.WHITE, end: str = "\n"):
    """Print colored text to the console"""
    print(f"{color}{text}{Style.RESET_ALL}", end=end)


def print_header(text: str):
    """Print a formatted header"""
    print_colored("\n" + "=" * 50, Fore.CYAN)
    print_colored(f" {text}", Fore.CYAN + Style.BRIGHT)
    print_colored("=" * 50 + "\n", Fore.CYAN)


def print_success(message: str):
    """Print a success message"""
    print_colored(f"✓ {message}", Fore.GREEN)


def print_error(message: str):
    """Print an error message"""
    print_colored(f"✗ {message}", Fore.RED)


def print_warning(message: str):
    """Print a warning message"""
    print_colored(f"⚠ {message}", Fore.YELLOW)


def get_input(prompt: str, default: Optional[str] = None) -> str:
    """
    Get user input with optional default value
    
    Args:
        prompt: The input prompt
        default: Default value if user enters nothing
        
    Returns:
        User input or default value
    """
    if default:
        full_prompt = f"{prompt} [{default}]: "
    else:
        full_prompt = f"{prompt}: "
    
    user_input = input(full_prompt).strip()
    if not user_input and default is not None:
        return default
    return user_input


def confirm_action(prompt: str = "Are you sure?") -> bool:
    """
    Ask for user confirmation
    
    Args:
        prompt: Confirmation prompt
        
    Returns:
        True if user confirms, False otherwise
    """
    response = get_input(f"{prompt} (y/N): ").lower()
    return response in ['y', 'yes']