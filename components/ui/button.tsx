import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  default: 'bg-accent text-accent-foreground hover:bg-accent/90',
  outline: 'border border-border bg-transparent text-foreground hover:bg-muted/80',
  ghost: 'bg-transparent text-foreground hover:bg-muted/80'
};

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-5 py-3 text-lg'
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
      className={`inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${variantClasses[variant]} ${sizeClasses[size]} ${className ?? ''}`}
      {...props}
    >
      {children}
    </button>
  );
};
