import React from 'react';
import { Trophy } from 'lucide-react';

export interface AchievementBadgeProps {
  icon: string;
  title: string;
  description: string;
  unlockedAt?: Date;
  size?: 'sm' | 'md' | 'lg';
}

export const AchievementBadge = React.forwardRef<HTMLDivElement, AchievementBadgeProps>(
  ({ icon, title, description, unlockedAt, size = 'md' }, ref) => {
    const isUnlocked = !!unlockedAt;

    const sizeClasses = {
      sm: 'w-16 h-16',
      md: 'w-20 h-20',
      lg: 'w-24 h-24',
    };

    const textSizes = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    };

    return (
      <div
        ref={ref}
        className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-300 ${
          isUnlocked
            ? 'bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-2 border-yellow-300 dark:border-yellow-600 shadow-lg hover:shadow-xl hover:scale-105'
            : 'bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 opacity-50'
        }`}
      >
        <div
          className={`${sizeClasses[size]} flex items-center justify-center text-3xl md:text-4xl ${
            isUnlocked ? 'animate-bounce-soft' : ''
          }`}
        >
          {icon}
        </div>
        <div className="text-center">
          <p className={`font-bold text-[var(--color-text)] ${textSizes[size]}`}>{title}</p>
          <p className={`text-[var(--color-text-muted)] ${textSizes[size]}`}>{description}</p>
        </div>
      </div>
    );
  }
);

AchievementBadge.displayName = 'AchievementBadge';
