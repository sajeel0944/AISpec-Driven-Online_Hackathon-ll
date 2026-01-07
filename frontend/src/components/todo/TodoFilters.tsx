// components/todo/TodoFilters/TodoFilters.tsx
'use client';

import React, { useState } from 'react';
import { TodoFilters as ITodoFilters, TodoStatus, TodoPriority } from '@/types/todo.types';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';

interface TodoFiltersProps {
  onFilterChange: (filters: ITodoFilters) => void;
}

const TodoFilters: React.FC<TodoFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<ITodoFilters>({});
  const [search, setSearch] = useState('');

  const handleSearch = (value: string) => {
    setSearch(value);
    const newFilters = { ...filters, search: value || undefined };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleStatusChange = (status: TodoStatus | 'all') => {
    const newFilters = { 
      ...filters, 
      status: status === 'all' ? undefined : status 
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriorityChange = (priority: TodoPriority | 'all') => {
    const newFilters = { 
      ...filters, 
      priority: priority === 'all' ? undefined : priority 
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    setSearch('');
    onFilterChange({});
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== undefined);

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search todos by title, description, or tags..."
            className="block w-full pl-10 pr-3 py-2.5 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <FiFilter className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          
          <select
            value={filters.status || 'all'}
            onChange={(e) => handleStatusChange(e.target.value as TodoStatus | 'all')}
            className="px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm cursor-pointer"
          >
            <option className='text-gray-900' value="all">All Status</option>
            <option className='text-gray-900' value="PENDING">Pending</option>
            <option className='text-gray-900' value="IN_PROGRESS">In Progress</option>
            <option className='text-gray-900' value="COMPLETED">Completed</option>
          </select>
          
          <select
            value={filters.priority || 'all'}
            onChange={(e) => handlePriorityChange(e.target.value as TodoPriority | 'all')}
            className="px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm cursor-pointer"
          >
            <option className='text-gray-900' value="all">All Priority</option>
            <option className='text-gray-900' value="LOW">Low</option>
            <option className='text-gray-900' value="MEDIUM">Medium</option>
            <option className='text-gray-900' value="HIGH">High</option>
          </select>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiX className="h-4 w-4 mr-1.5" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            
            {filters.status && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Status: {filters.status.toLowerCase()}
                <button
                  onClick={() => handleStatusChange('all')}
                  className="ml-1.5 text-blue-600 hover:text-blue-800"
                >
                  <FiX className="h-3 w-3" />
                </button>
              </span>
            )}
            
            {filters.priority && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Priority: {filters.priority.toLowerCase()}
                <button
                  onClick={() => handlePriorityChange('all')}
                  className="ml-1.5 text-green-600 hover:text-green-800"
                >
                  <FiX className="h-3 w-3" />
                </button>
              </span>
            )}
            
            {filters.search && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Search: {filters.search}
                <button
                  onClick={() => handleSearch('')}
                  className="ml-1.5 text-yellow-600 hover:text-yellow-800"
                >
                  <FiX className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoFilters;