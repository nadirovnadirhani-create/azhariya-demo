import React from 'react';
import { cn } from '@/shared/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'interactive' | 'spatial';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-white/90 dark:bg-slate-900/90 border border-slate-100 dark:border-slate-800/60 shadow-[0_8px_30px_rgb(10,60,47,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)]',
      glass: 'glass-premium border border-white/20 dark:border-white/5',
      interactive: 'bg-white/90 dark:bg-slate-900/90 border border-slate-100 dark:border-slate-800/60 shadow-[0_8px_30px_rgb(10,60,47,0.03)] card-hover cursor-pointer',
      spatial: 'glass-premium spatial-card border border-white/20 dark:border-white/5 cursor-pointer'
    };

    return (
      <div
        ref={ref}
        className={cn('rounded-3xl overflow-hidden backdrop-blur-md transition-all duration-300', variants[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';
