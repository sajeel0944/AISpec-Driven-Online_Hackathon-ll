// components/todo/TodoStats/TodoStats.tsx
'use client';

import React from 'react';
import { Todo } from '@/types/todo.types';
import { FiCheckCircle, FiClock, FiAlertCircle, FiList } from 'react-icons/fi';
import { IconType } from 'react-icons';

interface TodoStatsProps {
  todos: Todo[];
}

const TodoStats: React.FC<TodoStatsProps> = ({ todos }) => {
  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.status === 'Completed').length,
    pending: todos.filter(t => t.status === 'Pending').length,
    inProgress: todos.filter(t => t.status === 'In Progress').length,
    overdue: todos.filter(t => 
      new Date(t.due_date) < new Date() && t.status !== 'Completed'
    ).length,
    highPriority: todos.filter(t => t.priority === 'High').length,
  };

  const completionRate = stats.total > 0 
    ? Math.round((stats.completed / stats.total) * 100) 
    : 0;

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    color 
  }: { 
    title: string; 
    value: number; 
    icon: IconType; 
    color: string; 
  }) => (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${color} mr-4`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Todos"
          value={stats.total}
          icon={FiList}
          color="bg-blue-500"
        />
        
        <StatCard
          title="Completed"
          value={stats.completed}
          icon={FiCheckCircle}
          color="bg-green-500"
        />
        
        <StatCard
          title="In Progress"
          value={stats.inProgress}
          icon={FiClock}
          color="bg-yellow-500"
        />
        
        <StatCard
          title="Overdue"
          value={stats.overdue}
          icon={FiAlertCircle}
          color="bg-red-500"
        />
      </div>

      {/* Progress Bar and Additional Stats */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-900">Progress</h3>
            <span className="text-2xl font-bold text-gray-900">{completionRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.pending}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{stats.highPriority}</div>
            <div className="text-sm text-gray-600">High Priority</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {stats.total > 0 ? Math.round(stats.total / 7) : 0}
            </div>
            <div className="text-sm text-gray-600">Avg per week</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {stats.total > 0 ? Math.round(stats.completed / (stats.total / 100)) : 0}%
            </div>
            <div className="text-sm text-gray-600">Completion Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoStats;