// lib/types/todo.types.ts
export type TodoStatus = 'Pending' | 'In Progress' | 'Completed';
export type TodoPriority = 'Low' | 'Medium' | 'High';

export interface Todo {
  id: number;
  title: string;
  description: string | null;
  status: TodoStatus;
  priority: TodoPriority;
  created_at: string;
  due_date: string;
  tags: string[];
}

export interface AddTodoRequest {
  email: string;
  todo: {
    title: string;
    description: string | null;
    status: TodoStatus;
    priority: TodoPriority;
    created_at: string;
    due_date: string;
    tags: string[];
  };
}

export interface UpdateTodoRequest {
  email: string;
  updated_data: Todo;
}

export interface DeleteTodoRequest {
  email: string;
  todo_id: number;
}

export interface ApiResponse {
  status: 'success' | 'error';
  message: string;
}

export interface TodoFilters {
  status?: TodoStatus | 'all';
  priority?: TodoPriority | 'all';
  search?: string;
  tags?: string[];
}