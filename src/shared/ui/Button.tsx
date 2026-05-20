import React from 'react';
import { cn } from '@/shared/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const variants = {
      primary: 'bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] text-white shadow-[0_10px_25px_rgba(10,60,47,0.15)] hover:shadow-[0_15px_30px_rgba(10,60,47,0.25)] hover:-translate-y-0.5 active:translate-y-0 active:scale-98 dark:from-[var(--color-primary)] dark:to-[var(--color-primary-dark)] dark:shadow-[0_10px_25px_rgba(56,189,248,0.15)] dark:hover:shadow-[0_15px_30px_rgba(56,189,248,0.25)]',
      accent: 'bg-gradient-to-r from-[#B89222] via-[var(--color-accent)] to-[#E8C550] text-[#0A3C2F] shadow-[0_10px_25px_rgba(212,175,55,0.25)] hover:shadow-[0_15px_30px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:scale-98 dark:from-[var(--color-accent)] dark:to-[var(--color-accent-light)] dark:shadow-[0_10px_25px_rgba(245,158,11,0.25)] dark:hover:shadow-[0_15px_30px_rgba(245,158,11,0.4)]',
      outline: 'border border-[var(--color-primary)]/30 text-[var(--color-primary)] bg-white/40 backdrop-blur-sm hover:bg-[var(--color-primary)] hover:text-white dark:border-[var(--color-accent)]/30 dark:text-[var(--color-accent)] dark:bg-slate-900/40 dark:hover:bg-[var(--color-accent)] dark:hover:text-[#0A3C2F] hover:-translate-y-0.5 active:translate-y-0',
      ghost: 'bg-transparent text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-slate-100 dark:hover:bg-slate-800/60 active:scale-98',
      glass: 'glass border border-white/20 text-[var(--color-primary)] dark:text-[var(--color-accent)] hover:border-[var(--color-accent)]/50 hover:shadow-md hover:-translate-y-0.5'
    };

    const sizes = {
      sm: 'px-4 py-2 text-xs rounded-xl font-bold tracking-wider uppercase',
      md: 'px-6 py-3 text-sm rounded-2xl font-semibold',
      lg: 'px-8 py-4.5 text-base rounded-2xl font-bold tracking-wide shadow-md',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-accent)] disabled:opacity-40 disabled:pointer-events-none cursor-pointer',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2.5 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
