// components/Button.tsx
import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps {
  text: string;
  type?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg' | 'wide';
  href?: string;
  className?: string;
  onClick?: () => void;
}

const typeStyles = {
  primary: 'bg-secondary hover:bg-gray-400 text-black',
  secondary: 'bg-accent hover:bg-blue-800 text-white'
};

const sizeStyles = {
  sm: 'px-4 py-3 text-sm',
  md: 'px-4 py-3 text-sm lg:px-6 lg:py-4 lg:text-base',
  lg: 'px-4 py-3 text-sm lg:px-8 lg:py-4 lg:text-lg ',
  wide: 'px-24 py-3 text-xl'
};

const Button: React.FC<ButtonProps> = ({
  text,
  type = 'primary',
  size = 'md',
  href,
  className,
  onClick
}) => {
  return href ? (
    <Link
      href={href}
      onClick={onClick}
      className={twMerge(
        'items-center rounded',
        typeStyles[type],
        sizeStyles[size],
        className
      )}
    >
      {text}{' '}
    </Link>
  ) : (
    <button
      onClick={onClick}
      className={twMerge(
        'items-center rounded',
        typeStyles[type],
        sizeStyles[size],
        className
      )}
    >
      {text}
    </button>
  );
};

export default Button;
