"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTodoStore } from "@/store/todo.store";
import { TodoFilters as ITodoFilters } from "@/types/todo.types";
import Loader from "@/components/ui/Todo/Loader";
import TodoHeader from "@/components/todo/TodoHeader";
import TodoStats from "@/components/todo/TodoStats";
import TodoFilters from "@/components/todo/TodoFilters";
import TodoList from "@/components/todo/TodoList";
import TodoFormModal from "@/components/todo/TodoFormModal";
import Alert from "@/components/common/Alert/Todo/Alert";

export default function DashboardPage() {
  const router = useRouter();
  const [showAddModal, setShowAddModal] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [filters, setFilters] = useState<ITodoFilters>({});
  const [initialized, setInitialized] = useState(false);

  const { todos, loading, error, fetchTodos, clearError } = useTodoStore();

  useEffect(() => {
    // Check authentication
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
      return;
    }

    // Initialize data
    const initData = async () => {
      try {
        await fetchTodos();
      } finally {
        setInitialized(true);
      }
    };

    initData();
  }, [router, fetchTodos]);

  const handleFilterChange = (newFilters: ITodoFilters) => {
    setFilters(newFilters);
  };

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddSuccess = () => {
    setShowAddModal(false);
    showNotification("success", "Todo added successfully!");
  };

  const handleEditSuccess = () => {
    showNotification("success", "Todo updated successfully!");
  };

  const handleDeleteSuccess = () => {
    showNotification("success", "Todo deleted successfully!");
  };

  if (!initialized) {
    return (
      <div className="p-8 flex items-center justify-center h-screen">
        <Loader size="lg" variant="primary" text="Loading todos..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TodoHeader onAddTodo={() => setShowAddModal(true)} />

      <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="mb-8">
          <TodoStats todos={todos} />
        </div>

        {/* Filters */}
        <div className="mb-6">
          <TodoFilters onFilterChange={handleFilterChange} />
        </div>

        {/* Notifications */}
        {notification && (
          <div className="mb-6">
            <Alert
              type={notification.type}
              message={notification.message}
              onClose={() => setNotification(null)}
            />
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mb-6">
            <Alert type="error" message={error} onClose={clearError} />
          </div>
        )}

        {/* Todo List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <TodoList
            todos={todos}
            loading={loading}
            filters={filters}
            onEditSuccess={handleEditSuccess}
            onDeleteSuccess={handleDeleteSuccess}
          />
        </div>

        {/* Empty State */}
        {!loading && todos.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
              <svg
                className="h-full w-full"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No todos yet
            </h3>
            <p className="text-gray-600 mb-6">
              Get started by creating your first todo item
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg
                className="-ml-1 mr-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Todo
            </button>
          </div>
        )}
      </main>

      {/* Add Todo Modal */}
      <TodoFormModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleAddSuccess}
      />
    </div>
  );
}
