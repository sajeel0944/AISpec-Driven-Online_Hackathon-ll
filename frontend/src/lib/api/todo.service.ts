// lib/api/todo.service.ts
import axios from 'axios';
import { Todo, AddTodoRequest, UpdateTodoRequest, DeleteTodoRequest, ApiResponse } from '@/types/todo.types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

class TodoService {
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  private getUserEmail(): string {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          return user.email;
        } catch (e) {
          console.error('Failed to parse user:', e);
        }
      }
    }
    return '';
  }

  async addTodo(todoData: Omit<Todo, 'id'>): Promise<ApiResponse> {
    try {
      const email = this.getUserEmail();
      if (!email) {
        throw new Error('User not authenticated');
      }

      const payload: AddTodoRequest = {
        email,
        todo: {
          title: todoData.title,
          description: todoData.description || '',
          status: todoData.status,
          priority: todoData.priority,
          created_at: todoData.created_at,
          due_date: todoData.due_date,
          tags: todoData.tags
        }
      };

      console.log('Adding todo with payload:', payload);

      const response = await axios.post(`${API_BASE_URL}/add_todo`, payload, {
        headers: this.getAuthHeaders()
      });

      return response.data;
    } catch (error) {
      console.error('Add todo error:', error);
      return {
        status: 'error',
        message: 'Failed to add todo'
      };
    }
  }

  async getTodos(): Promise<Todo[]> {
    try {
      const email = this.getUserEmail();
      if (!email) {
        console.warn('No email found for user');
        return [];
      }

      console.log('Fetching todos for email:', email);

      const response = await axios.get(`${API_BASE_URL}/get_todos?email=${encodeURIComponent(email)}`, {
        headers: this.getAuthHeaders()
      });

      console.log('Todos response:', response.data);

      // Backend returns array directly on success, empty array on error
      if (Array.isArray(response.data)) {
        return response.data;
      }
      
      return [];
    } catch (error) {
      console.error('Get todos error:', error);
      return [];
    }
  }

  async updateTodo(todo: Todo): Promise<ApiResponse> {
    try {
      const email = this.getUserEmail();
      if (!email) {
        throw new Error('User not authenticated');
      }

      const payload: UpdateTodoRequest = {
        email,
        updated_data: todo
      };

      console.log('Updating todo with payload:', payload);

      const response = await axios.put(`${API_BASE_URL}/update_todo`, payload, {
        headers: this.getAuthHeaders()
      });

      return response.data;
    } catch (error) {
      console.error('Update todo error:', error);
      return {
        status: 'error',
        message: 'Failed to update todo'
      };
    }
  }

  async deleteTodo(todoId: number): Promise<ApiResponse> {
    try {
      const email = this.getUserEmail();
      if (!email) {
        throw new Error('User not authenticated');
      }

      const payload: DeleteTodoRequest = {
        email,
        todo_id: todoId
      };

      console.log('Deleting todo with payload:', payload);

      const response = await axios.delete(`${API_BASE_URL}/delete_todo`, {
        headers: this.getAuthHeaders(),
        data: payload
      });

      return response.data;
    } catch (error) {
      console.error('Delete todo error:', error);
      return {
        status: 'error',
        message: 'Failed to delete todo'
      };
    }
  }
}

export default new TodoService();