// components/todo/TodoForm/TodoForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Todo, TodoStatus, TodoPriority } from '@/types/todo.types';
import { useTodoStore } from '@/store/todo.store';
import Input from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { FiCalendar, FiTag, FiX } from 'react-icons/fi';

interface TodoFormProps {
  todo?: Todo;
  mode?: 'add' | 'edit';
  onSuccess?: () => void;
  onCancel?: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ todo, mode = 'add', onSuccess, onCancel }) => {
  const { addTodo, updateTodo, loading, error, clearError } = useTodoStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Pending' as TodoStatus,
    priority: 'Medium' as TodoPriority,
    due_date: '',
    tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState('');
  const [localError, setLocalError] = useState('');

  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title,
        description: todo.description || '',
        status: todo.status,
        priority: todo.priority,
        due_date: todo.due_date ? todo.due_date.split('T')[0] : '',
        tags: todo.tags || [],
      });
    } else {
      // Set default due date to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setFormData(prev => ({
        ...prev,
        due_date: tomorrow.toISOString().split('T')[0]
      }));
    }
  }, [todo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    clearError();

    // Validation
    if (!formData.title.trim()) {
      setLocalError('Title is required');
      return;
    }

    if (formData.title.length > 100) {
      setLocalError('Title must be less than 100 characters');
      return;
    }

    if (!formData.due_date) {
      setLocalError('Due date is required');
      return;
    }

    try {
      const todoData = {
        ...formData,
        description: formData.description || null,
        created_at: todo?.created_at || new Date().toISOString(),
        due_date: formData.due_date,
        tags: formData.tags.filter(tag => tag.trim() !== ''),
      };

      if (mode === 'edit' && todo) {
        const updatedTodo: Todo = {
          ...todo,
          ...todoData,
          id: todo.id,
        };
        const success = await updateTodo(updatedTodo);
        if (success && onSuccess) onSuccess();
      } else {
        const success = await addTodo(todoData);
        if (success && onSuccess) onSuccess();
      }
    } catch {
      setLocalError('Failed to save todo');
    }
  };

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !formData.tags.includes(trimmedTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, trimmedTag],
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {(error || localError) && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-800">{error || localError}</p>
        </div>
      )}

      <Input
        label="Title *"
        name="title"
        value={formData.title}
        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
        placeholder="What needs to be done?"
        required
        maxLength={100}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Add more details (optional)..."
          rows={3}
          className="block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors text-gray-700 p-2 resize-y"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status *
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as TodoStatus }))}
            className="block w-full rounded-lg border-gray-300 shadow-sm text-gray-800 focus:border-blue-500 focus:ring-blue-500 transition-colors p-2 cursor-pointer"
            required
          >
            <option className='text-gray-800' value="Pending">Pending</option>
            <option className='text-gray-800' value="In Progress">In Progress</option>
            <option className='text-gray-800' value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Priority *
          </label>
          <select
            name="priority"
            value={formData.priority}
            onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as TodoPriority }))}
            className="block w-full rounded-lg border-gray-300 shadow-sm text-gray-800 focus:border-blue-500 focus:ring-blue-500 transition-colors p-2 cursor-pointer"
            required
          >
            <option className='text-gray-800' value="Low">Low</option>
            <option className='text-gray-800' value="Medium">Medium</option>
            <option className='text-gray-800' value="High">High</option>
          </select>
        </div>
      </div>

      <Input
        label="Due Date *"
        type="date"
        name="due_date"
        value={formData.due_date}
        onChange={(e) => setFormData(prev => ({ ...prev, due_date: e.target.value }))}
        icon={<FiCalendar />}
        min={new Date().toISOString().split('T')[0]}
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tags
        </label>
        <div className="flex items-center gap-2 mb-3">
          <Input
            name="tagInput"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a tag and press Enter"
            icon={<FiTag />}
            className="flex-1"
          />
          <Button
            type="button"
            onClick={handleAddTag}
            variant="outline"
            disabled={!tagInput.trim()}
            className="whitespace-nowrap text-gray-800 cursor-pointer"
          >
            Add Tag
          </Button>
        </div>
        
        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.tags.map(tag => (
              <div
                key={tag}
                className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-100 text-blue-800 text-sm"
              >
                <FiTag className="h-3 w-3 mr-1.5" />
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 text-blue-600 hover:text-blue-800 cursor-pointer"
                  aria-label={`Remove tag ${tag}`}
                >
                  <FiX className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={loading}
            className='text-gray-800 cursor-pointer'
          >
            Cancel
          </Button>
        )}
        
        <Button
          type="submit"
          loading={loading}
          disabled={loading}
          className="min-w-[120px]"
        >
          {mode === 'edit' ? 'Update Todo' : 'Add Todo'}
        </Button>
      </div>
    </form>
  );
};

export default TodoForm;