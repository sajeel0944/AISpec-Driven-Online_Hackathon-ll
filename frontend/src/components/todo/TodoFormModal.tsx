// components/todo/TodoForm/TodoFormModal.tsx
"use client";

import React from "react";
import { Todo } from "@/types/todo.types";
import TodoForm from "./TodoForm";
import { FiX } from "react-icons/fi";

interface TodoFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  todo?: Todo;
  mode?: "add" | "edit";
}

const TodoFormModal: React.FC<TodoFormModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  todo,
  mode = "add",
}) => {
  if (!isOpen) return null;

  const handleSuccess = () => {
    onSuccess();
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div
            className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {mode === "edit" ? "Edit Todo" : "Add New Todo"}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {mode === "edit"
                    ? "Update your todo item details"
                    : "Create a new todo item to track your tasks"}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <div className="p-6">
              <TodoForm
                todo={todo}
                mode={mode}
                onSuccess={handleSuccess}
                onCancel={onClose}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoFormModal;
