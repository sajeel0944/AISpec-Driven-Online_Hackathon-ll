// components/common/Alert/Alert.tsx
import React from 'react';
import { FiAlertCircle, FiCheckCircle, FiInfo, FiX } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  onClose?: () => void;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({ 
  type, 
  title, 
  message, 
  onClose,
  className 
}) => {
  const icons = {
    success: <FiCheckCircle className="h-5 w-5" />,
    error: <FiAlertCircle className="h-5 w-5" />,
    warning: <FiAlertCircle className="h-5 w-5" />,
    info: <FiInfo className="h-5 w-5" />,
  };

  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  return (
    <div
      className={twMerge(
        'rounded-lg border p-4',
        colors[type],
        className
      )}
      role="alert"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          {icons[type]}
        </div>
        <div className="flex-1">
          {title && (
            <h3 className="font-semibold mb-1">{title}</h3>
          )}
          <p className="text-sm">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            aria-label="Close alert"
          >
            <FiX className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;