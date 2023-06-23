// components/Button.tsx
import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps {
  text: string;
  theme?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg' | 'wide';
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
  icon?: React.ReactNode;
}

const themeStyles = {
  primary: 'bg-secondary hover:bg-gray-400 text-black',
  secondary: 'bg-accent hover:bg-accentHover text-white'
};

const sizeStyles = {
  sm: 'px-4 py-3 text-sm ',
  md: 'px-4 py-3 text-sm lg:px-6 lg:py-4 lg:text-base',
  lg: 'px-4 py-3 text-sm lg:px-8 lg:py-4 lg:text-lg ',
  wide: 'w-5/6 py-3 text-lg'
};

const Button: React.FC<ButtonProps> = ({
  text,
  theme = 'primary',
  size = 'md',
  href,
  className,
  onClick,
  type,
  icon
}) => {
  return href ? (
    <Link
      href={href}
      onClick={onClick}
      className={twMerge(
        'items-center rounded',
        themeStyles[theme],
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
        themeStyles[theme],
        sizeStyles[size],
        className,
        icon && 'flex flex-row'
      )}
      type={type}
    >
      {icon}
      {text}
    </button>
  );
};

export default Button;
