// components/todo/TodoHeader/TodoHeader.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FiPlus, FiLogOut, FiUser } from 'react-icons/fi';
import authService from '@/lib/auth/auth.service';

interface TodoHeaderProps {
  onAddTodo: () => void;
}

const TodoHeader: React.FC<TodoHeaderProps> = ({ onAddTodo }) => {
  const router = useRouter();

  const getUserEmail = () => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          return user.email || 'User';
        } catch {
          return 'User';
        }
      }
    }
    return 'User';
  };

  const handleLogout = () => {
    authService.logout();
    router.push('/login');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
              <div>
                <h1 className="text-xl font-bold text-black">Todo Manager</h1>
                <p className="text-sm text-gray-500 hidden sm:block">Stay organized and productive</p>
              </div>
          </div>

          {/* User Info */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
              <FiUser className="h-4 w-4 mr-2 text-gray-400" />
              <span className="font-medium">{getUserEmail()}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onAddTodo}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
            >
              <FiPlus className="mr-2 h-4 w-4" />
              Add Todo
            </button>
            
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 cursor-pointer"
            >
              <FiLogOut className="h-4 w-4" />
              <span className="ml-2 hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TodoHeader;