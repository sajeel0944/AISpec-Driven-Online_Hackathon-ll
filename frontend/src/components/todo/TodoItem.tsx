// components/todo/TodoList/TodoItem.tsx
'use client';

import React, { useState } from 'react';
import { Todo } from '@/types/todo.types';
import { useTodoStore } from '@/store/todo.store';
import { FiEdit2, FiTrash2, FiCalendar, FiTag, FiCheckCircle, FiClock } from 'react-icons/fi';
import { format } from 'date-fns';

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDeleteSuccess?: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onEdit, onDeleteSuccess }) => {
  const { updateTodo, deleteTodo } = useTodoStore();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusToggle = async () => {
    const newStatus: Todo['status'] = todo.status === 'Completed' ? 'Pending' : 'Completed';
    const updatedTodo = { ...todo, status: newStatus };
    await updateTodo(updatedTodo);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const success = await deleteTodo(todo.id);
      if (success && onDeleteSuccess) {
        onDeleteSuccess();
      }
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch {
      return 'Invalid date';
    }
  };

  const isOverdue = new Date(todo.due_date) < new Date() && todo.status !== 'Completed';

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:border-gray-300 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-start gap-3 mb-3">
            <button
              onClick={handleStatusToggle}
              className={`mt-1 p-1 rounded-full cursor-pointer ${
                todo.status === 'Completed' 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-gray-100 text-gray-400 hover:text-gray-600'
              }`}
              aria-label={todo.status === 'Completed' ? 'Mark as pending' : 'Mark as completed'}
            >
              <FiCheckCircle className="h-4 w-4" />
            </button>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className={`text-base font-medium ${
                  todo.status === 'Completed' ? 'text-gray-500 line-through' : 'text-gray-900'
                }`}>
                  {todo.title}
                </h3>
                
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${getPriorityColor(todo.priority)}`}>
                    {todo.priority.toLowerCase()}
                  </span>
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(todo.status)}`}>
                    {todo.status.toLowerCase().replace('_', ' ')}
                  </span>
                </div>
              </div>
              
              {todo.description && (
                <p className="text-sm text-gray-600 mb-3">{todo.description}</p>
              )}
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <FiCalendar className="h-4 w-4 mr-1.5" />
                  <span className={isOverdue ? 'text-red-600 font-medium' : ''}>
                    {formatDate(todo.due_date)}
                    {isOverdue && ' (Overdue)'}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <FiClock className="h-4 w-4 mr-1.5" />
                  <span>{formatDate(todo.created_at)}</span>
                </div>
                
                {todo.tags && todo.tags.length > 0 && (
                  <div className="flex items-center flex-wrap gap-1.5">
                    <FiTag className="h-4 w-4 mr-1" />
                    {todo.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="ml-4 flex items-center gap-2">
          <button
            onClick={() => onEdit(todo)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
            aria-label="Edit todo"
          >
            <FiEdit2 className="h-4 w-4" />
          </button>
          
          <div className="relative">
            <button
              onClick={() => setShowDeleteConfirm(true)}
              disabled={isDeleting}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50 cursor-pointer"
              aria-label="Delete todo"
            >
              {isDeleting ? (
                <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-red-600"></div>
              ) : (
                <FiTrash2 className="h-4 w-4" />
              )}
            </button>
            
            {showDeleteConfirm && (
              <>
                <div 
                  className="fixed inset-0 z-40"
                  onClick={() => setShowDeleteConfirm(false)}
                />
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4">
                    <p className="text-sm font-medium text-gray-900 mb-2">Delete todo?</p>
                    <p className="text-sm text-gray-600 mb-4">{todo.title}will be permanently deleted.</p>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setShowDeleteConfirm(false)}
                        className={`px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md ${isDeleting ? "cursor-not-allowed" : "cursor-pointer"}`}
                        disabled={isDeleting}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleDelete}
                        className={`px-3 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md ${isDeleting ? "cursor-not-allowed" : "cursor-pointer"}`}
                        disabled={isDeleting}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;