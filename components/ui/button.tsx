import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  default: 'button-default',
  outline: 'button-outline',
  ghost: 'button-ghost'
};

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'button-sm',
  md: 'button-md',
  lg: 'button-lg'
};

export const Button: FC<ButtonProps> = ({
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={`button-base ${variantClasses[variant]} ${sizeClasses[size]} ${className ?? ''}`}
      {...props}
    >
      {children}
    </button>
  );
};
