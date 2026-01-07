// components/todo/TodoList/TodoList.tsx
'use client';

import React, { useState } from 'react';
import { Todo, TodoFilters } from '@/types/todo.types';
import { FiFilter } from 'react-icons/fi';
import TodoItem from './TodoItem';
import TodoFormModal from './TodoFormModal';
import Loader from '../ui/Todo/Loader';

interface TodoListProps {
  todos: Todo[];
  loading: boolean;
  filters: TodoFilters;
  onEditSuccess?: () => void;
  onDeleteSuccess?: () => void;
}

const TodoList: React.FC<TodoListProps> = ({ 
  todos, 
  loading, 
  filters, 
  onEditSuccess, 
  onDeleteSuccess 
}) => {
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [showCompleted, setShowCompleted] = useState(true);

  // Filter todos
  const filteredTodos = todos.filter(todo => {
    // Status filter
    if (filters.status && filters.status !== 'all') {
      if (todo.status !== filters.status) return false;
    }
    
    // Priority filter
    if (filters.priority && filters.priority !== 'all') {
      if (todo.priority !== filters.priority) return false;
    }
    
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesTitle = todo.title.toLowerCase().includes(searchLower);
      const matchesDescription = todo.description?.toLowerCase().includes(searchLower) || false;
      const matchesTags = todo.tags.some(tag => tag.toLowerCase().includes(searchLower));
      
      if (!matchesTitle && !matchesDescription && !matchesTags) {
        return false;
      }
    }
    
    // Show/hide completed
    if (!showCompleted && todo.status === 'Completed') {
      return false;
    }
    
    return true;
  });

  // Group by status
  const pendingTodos = filteredTodos.filter(t => t.status === 'Pending');
  const inProgressTodos = filteredTodos.filter(t => t.status === 'In Progress');
  const completedTodos = filteredTodos.filter(t => t.status === 'Completed');

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const handleEditClose = () => {
    setEditingTodo(null);
    if (onEditSuccess) onEditSuccess();
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <Loader 
          size="lg" 
          variant="primary"
          text="Loading todos..."
        />
      </div>
    );
  }

  return (
    <>
      {/* Completed Toggle */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FiFilter className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-sm text-gray-600">
              Showing {filteredTodos.length} of {todos.length} todos
            </span>
          </div>
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className={`px-3 py-1 text-sm rounded-md cursor-pointer ${
              showCompleted 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {showCompleted ? 'Hide Completed' : 'Show Completed'}
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {/* Pending Todos */}
        {pendingTodos.length > 0 && (
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="h-2 w-24 bg-yellow-500 rounded-full mr-3"></div>
              <h2 className="text-lg font-semibold text-gray-900">Pending</h2>
              <span className="ml-3 px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                {pendingTodos.length}
              </span>
            </div>
            <div className="space-y-4">
              {pendingTodos.map(todo => (
                <TodoItem 
                  key={todo.id} 
                  todo={todo} 
                  onEdit={handleEdit}
                  onDeleteSuccess={onDeleteSuccess}
                />
              ))}
            </div>
          </div>
        )}

        {/* In Progress Todos */}
        {inProgressTodos.length > 0 && (
          <div className="p-6 bg-blue-50">
            <div className="flex items-center mb-4">
              <div className="h-2 w-24 bg-blue-500 rounded-full mr-3"></div>
              <h2 className="text-lg font-semibold text-gray-900">In Progress</h2>
              <span className="ml-3 px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                {inProgressTodos.length}
              </span>
            </div>
            <div className="space-y-4">
              {inProgressTodos.map(todo => (
                <TodoItem 
                  key={todo.id} 
                  todo={todo} 
                  onEdit={handleEdit}
                  onDeleteSuccess={onDeleteSuccess}
                />
              ))}
            </div>
          </div>
        )}

        {/* Completed Todos */}
        {showCompleted && completedTodos.length > 0 && (
          <div className="p-6 bg-green-50">
            <div className="flex items-center mb-4">
              <div className="h-2 w-24 bg-green-500 rounded-full mr-3"></div>
              <h2 className="text-lg font-semibold text-gray-900">Completed</h2>
              <span className="ml-3 px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                {completedTodos.length}
              </span>
            </div>
            <div className="space-y-4">
              {completedTodos.map(todo => (
                <TodoItem 
                  key={todo.id} 
                  todo={todo} 
                  onEdit={handleEdit}
                  onDeleteSuccess={onDeleteSuccess}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredTodos.length === 0 && todos.length > 0 && (
          <div className="p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-3 text-sm font-medium text-gray-900">No matching todos</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your filters or search</p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingTodo && (
        <TodoFormModal
          isOpen={!!editingTodo}
          onClose={() => setEditingTodo(null)}
          onSuccess={handleEditClose}
          todo={editingTodo}
          mode="edit"
        />
      )}
    </>
  );
};

export default TodoList;