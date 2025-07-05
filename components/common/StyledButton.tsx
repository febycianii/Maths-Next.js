/**
 * StyledButton.tsx
 *
 * A reusable, styled button component that provides consistent styling and behavior.
 * It supports different visual variants (primary, secondary, danger, ghost) and sizes (sm, md, lg).
 * This component encapsulates Tailwind CSS classes to create a clean and maintainable button API.
 */
import React from 'react';

// Defines the props accepted by the StyledButton component.
interface StyledButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'; // Visual style of the button
  size?: 'sm' | 'md' | 'lg'; // Size of the button
  className?: string; // Allows for additional custom styling
}

const StyledButton: React.FC<StyledButtonProps> = ({
  children,
  variant = 'primary', // Default variant
  size = 'md',        // Default size
  className = '',
  ...props // Pass through any other standard button attributes (e.g., onClick, type, disabled)
}) => {
  // Base classes applied to all button variants and sizes.
  const baseClasses = 'font-bold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150 flex items-center justify-center';

  // Classes specific to each button variant.
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-hover focus:ring-primary-focus',
    secondary: 'bg-secondary text-white hover:bg-green-600 focus:ring-green-500',
    danger: 'bg-danger text-white hover:bg-red-600 focus:ring-red-500',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-200 focus:ring-primary-focus',
  };

  // Classes specific to each button size.
  const sizeClasses = {
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg',
  };

  // Combine all classes: base, variant, size, and any custom classes.
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

export default StyledButton;
