// components/ui/Loader.tsx
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'danger';
  className?: string;
  text?: string;
  fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ 
  size = 'md', 
  variant = 'primary',
  className,
  text,
  fullScreen = false
}) => {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
    xl: 'h-16 w-16 border-4',
  };

  const variants = {
    default: 'border-gray-300 border-t-gray-600',
    primary: 'border-blue-200 border-t-blue-600',
    secondary: 'border-gray-200 border-t-gray-600',
    success: 'border-green-200 border-t-green-600',
    danger: 'border-red-200 border-t-red-600',
  };

  const loader = (
    <div className={twMerge('flex items-center', className)}>
      <div className={twMerge(
        'animate-spin rounded-full',
        sizes[size],
        variants[variant]
      )}></div>
      {text && (
        <span className={twMerge(
          'ml-3',
          variant === 'primary' ? 'text-blue-600' :
          variant === 'success' ? 'text-green-600' :
          variant === 'danger' ? 'text-red-600' : 'text-gray-600'
        )}>
          {text}
        </span>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center">
        {loader}
      </div>
    );
  }

  return loader;
};

export default Loader;