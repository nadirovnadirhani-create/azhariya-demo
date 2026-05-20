import React from 'react';
import { cn } from '@/shared/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'accent' | 'outline';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
      primary: 'bg-[var(--color-primary)] text-white',
      accent: 'bg-[var(--color-accent)] text-[#0F4C3A]',
      outline: 'border border-[var(--color-primary)] text-[var(--color-primary)] bg-transparent',
    };

    return (
      <span
        ref={ref}
        className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold', variants[variant], className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);
Badge.displayName = 'Badge';
