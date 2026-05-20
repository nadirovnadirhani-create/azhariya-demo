"use client";

import { useEffect, useState } from 'react';

export default function ProgressRing({ progress = 0, size = 120, strokeWidth = 8 }: { progress?: number, size?: number, strokeWidth?: number }) {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedProgress / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedProgress(progress), 100);
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <div className="progress-ring-wrapper relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="progress-ring-bg stroke-gray-200 dark:stroke-gray-700 fill-none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className="progress-ring-fill stroke-[var(--color-accent)] fill-none transition-all duration-1000 ease-out"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="progress-ring-label absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="progress-ring-value text-xl font-bold text-[var(--color-accent)]">{Math.round(animatedProgress)}%</span>
        <span className="progress-ring-text text-[10px] text-gray-400 uppercase tracking-widest">пройдено</span>
      </div>
    </div>
  );
}
