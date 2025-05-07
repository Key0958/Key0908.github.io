import React from 'react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ 
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className={`animate-pulse flex space-x-1.5`}>
        <div className={`h-2.5 w-2.5 bg-primary-500 rounded-full animate-bounce`} style={{ animationDelay: '0ms' }}></div>
        <div className={`h-2.5 w-2.5 bg-primary-500 rounded-full animate-bounce`} style={{ animationDelay: '150ms' }}></div>
        <div className={`h-2.5 w-2.5 bg-primary-500 rounded-full animate-bounce`} style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
};

export default Loader;