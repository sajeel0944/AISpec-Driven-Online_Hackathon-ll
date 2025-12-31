# CLI Commands (API Contracts): 001-todo-cli-app

**Date**: 2025-12-31

This document outlines the command-line interface (CLI) commands and their expected behavior, serving as the "API contracts" for the `001-todo-cli-app`.

## Base Command

The main entry point for the CLI is assumed to be `todo`.

## Commands

### 1. `todo add`

*   **Description**: Creates a new todo item.
*   **Usage**: `todo add <title> [--description <desc>]`
*   **Arguments**:
    *   `<title>` (required): The title of the new todo item.
*   **Options**:
    *   `--description <desc>` (optional): A detailed description for the todo item.
*   **Behavior**:
    *   Creates a new `TodoItem` in the local storage.
    *   `completed` status defaults to `False`.
    *   `created_at` and `updated_at` timestamps are automatically set.
    *   Prints a success message with the ID of the newly created todo item.
*   **Error Conditions**:
    *   If `<title>` is empty: Prints an error and exits.

### 2. `todo list`

*   **Description**: Lists existing todo items.
*   **Usage**: `todo list [--all|--completed|--pending]`
*   **Options**:
    *   `--all` (optional, mutually exclusive with `--completed`, `--pending`): Displays all todo items (default if no filter specified).
    *   `--completed` (optional, mutually exclusive): Displays only completed todo items.
    *   `--pending` (optional, mutually exclusive): Displays only pending (not completed) todo items.
*   **Behavior**:
    *   Retrieves todo items from local storage based on the specified filter.
    *   Prints each todo item with its ID, title, and completion status.
    *   If no items match the filter, prints a message indicating no items found.
*   **Error Conditions**:
    *   If multiple filter options are provided (e.g., `--completed --pending`): Prints an error and exits.

### 3. `todo complete`

*   **Description**: Marks a specific todo item as completed.
*   **Usage**: `todo complete <id>`
*   **Arguments**:
    *   `<id>` (required): The ID of the todo item to mark as completed.
*   **Behavior**:
    *   Finds the todo item by `<id>` in local storage.
    *   Sets its `completed` status to `True`.
    *   Updates the `updated_at` timestamp.
    *   Prints a success message.
*   **Error Conditions**:
    *   If `<id>` is not a valid integer: Prints an error and exits.
    *   If no todo item with the given `<id>` is found: Prints an error and exits.

### 4. `todo delete`

*   **Description**: Deletes a specific todo item.
*   **Usage**: `todo delete <id>`
*   **Arguments**:
    *   `<id>` (required): The ID of the todo item to delete.
*   **Behavior**:
    *   Finds the todo item by `<id>` in local storage.
    *   Removes the todo item from local storage.
    *   Prints a success message.
*   **Error Conditions**:
    *   If `<id>` is not a valid integer: Prints an error and exits.
    *   If no todo item with the given `<id>` is found: Prints an error and exits.

### 5. `todo show`

*   **Description**: Displays detailed information for a specific todo item.
*   **Usage**: `todo show <id>`
*   **Arguments**:
    *   `<id>` (required): The ID of the todo item to display.
*   **Behavior**:
    *   Finds the todo item by `<id>` in local storage.
    *   Prints all available details of the todo item (ID, title, description, completed status, creation/update timestamps).
*   **Error Conditions**:
    *   If `<id>` is not a valid integer: Prints an error and exits.
    *   If no todo item with the given `<id>` is found: Prints an error and exits.
