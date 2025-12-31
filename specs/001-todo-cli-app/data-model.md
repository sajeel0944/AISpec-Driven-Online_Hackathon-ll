# Data Model: 001-todo-cli-app

**Date**: 2025-12-31

This document defines the data model for the `001-todo-cli-app`, based on the assumed feature requirements and the choice of SQLModel for data persistence.

## Entity: TodoItem

The core entity for the todo application is `TodoItem`. This model is designed to be compatible with SQLModel and will map directly to a SQLite table.

### Attributes

| Attribute Name | Data Type | Constraints/Description |
|----------------|-----------|-------------------------|
| `id`           | `Optional[int]` | Primary Key. Auto-incremented for new items. |
| `title`        | `str`     | Required. The main text/name of the todo item. |
| `description`  | `Optional[str]` | Optional. A more detailed description for the todo item. |
| `completed`    | `bool`    | Default: `False`. Indicates whether the todo item is completed. |
| `created_at`   | `datetime`| Auto-generated timestamp when the item is created. |
| `updated_at`   | `datetime`| Auto-generated/updated timestamp for the last modification. |

### Example SQLModel Definition (Python)

```python
from datetime import datetime
from typing import Optional

from sqlmodel import Field, SQLModel

class TodoItem(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: Optional[str] = None
    completed: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    def __str__(self):
        status = "✓" if self.completed else " "
        return f"[{status}] {self.title} (ID: {self.id})"
```

## Relationships

*   Currently, no complex relationships with other entities are planned for this single-user, local-only CLI application. Each `TodoItem` is an independent record.

## Validation Rules

*   `title` must not be empty.
*   `id` must be a positive integer when provided (for updates/deletions).
*   `completed` must be a boolean.

## State Transitions

*   A `TodoItem` can transition from `completed=False` to `completed=True` (and vice-versa if needed, though typically only a one-way transition for 'completion').
*   `created_at` is set once on creation.
*   `updated_at` is updated on any modification to the `TodoItem` (e.g., changing title, description, or completion status).
