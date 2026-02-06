// store/todo.store.ts
import { create } from 'zustand';
import { Todo, TodoFilters } from '@/types/todo.types';
import todoService from '@/api/todo/todo.service';

interface TodoStore {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  filters: TodoFilters;
  
  // Actions
  fetchTodos: () => Promise<void>;
  addTodo: (todo: Omit<Todo, 'id'>) => Promise<boolean>;
  updateTodo: (todo: Todo) => Promise<boolean>;
  deleteTodo: (id: number) => Promise<boolean>;
  setFilters: (filters: TodoFilters) => void;
  clearFilters: () => void;
  clearError: () => void;
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  loading: false,
  error: null,
  filters: {},

  fetchTodos: async () => {
    set({ loading: true, error: null });
    try {
      const todos = await todoService.getTodos();
      set({ todos, loading: false });
    } catch {
      set({ 
        error: 'Failed to fetch todos', 
        loading: false 
      });
    }
  },

  addTodo: async (todoData) => {
    set({ loading: true, error: null });
    try {
      const result = await todoService.addTodo(todoData);
      
      if (result.status === 'success') {
        // Refresh todos list
        await get().fetchTodos();
        set({ loading: false });
        return true;
      } else {
        set({ 
          error: result.message, 
          loading: false 
        });
        return false;
      }
    } catch{
      set({ 
        error: 'Failed to add todo', 
        loading: false 
      });
      return false;
    }
  },

  updateTodo: async (todo) => {
    set({ loading: true, error: null });
    try {
      const result = await todoService.updateTodo(todo);
      
      if (result.status === 'success') {
        set(state => ({
          todos: state.todos.map(t => 
            t.id === todo.id ? todo : t
          ),
          loading: false
        }));
        return true;
      } else {
        set({ 
          error: result.message, 
          loading: false 
        });
        return false;
      }
    } catch {
      set({ 
        error: 'Failed to update todo', 
        loading: false 
      });
      return false;
    }
  },

  deleteTodo: async (id) => {
    set({ loading: true, error: null });
    try {
      const result = await todoService.deleteTodo(id);
      
      if (result.status === 'success') {
        set(state => ({
          todos: state.todos.filter(todo => todo.id !== id),
          loading: false
        }));
        return true;
      } else {
        set({ 
          error: result.message, 
          loading: false 
        });
        return false;
      }
    } catch {
      set({ 
        error: 'Failed to delete todo', 
        loading: false 
      });
      return false;
    }
  },

  setFilters: (filters) => {
    set({ filters });
  },

  clearFilters: () => {
    set({ filters: {} });
  },

  clearError: () => {
    set({ error: null });
  }
}));