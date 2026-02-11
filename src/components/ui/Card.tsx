import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  accent?: 'none' | 'red' | 'green' | 'blue' | 'orange';
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  accent = 'none',
  onClick,
}) => {
  const baseStyles = 'rounded-lg shadow-md p-4 transition-shadow duration-200';

  const variantStyles = {
    default: 'bg-white',
    success: 'bg-green-50 border border-green-200',
    warning: 'bg-yellow-50 border border-yellow-200',
    danger: 'bg-red-50 border border-red-200',
  };

  const accentStyles = {
    none: '',
    red: 'border-l-4 border-l-red-500',
    green: 'border-l-4 border-l-green-600',
    blue: 'border-l-4 border-l-sky-600',
    orange: 'border-l-4 border-l-orange-500',
  };

  const clickableStyles = onClick ? 'cursor-pointer hover:shadow-lg' : '';

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${accentStyles[accent]} ${clickableStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
