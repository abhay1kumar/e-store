import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className, hover = false }) => {
  return (
    <div
      className={cn(
        'bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700',
        hover && 'hover:shadow-md transition-shadow duration-200',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
