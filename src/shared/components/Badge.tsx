import React from 'react';
import { cn } from '@/shared/utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'critical' | 'neutral' | 'info';
  withDot?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function Badge({
  className,
  variant = 'neutral',
  withDot = false,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider',
        {
          'bg-emerald-100 text-emerald-800 border border-emerald-200': variant === 'success',
          'bg-amber-100 text-amber-800 border border-amber-200': variant === 'warning',
          'bg-rose-100 text-rose-800 border border-rose-200': variant === 'critical',
          'bg-slate-100 text-slate-700 border border-slate-300': variant === 'neutral',
          'bg-blue-100 text-blue-800 border border-blue-200': variant === 'info',
        },
        className
      )}
      {...props}
    >
      {withDot && (
        <span
          className={cn('w-1.5 h-1.5 rounded-full', {
            'bg-emerald-600': variant === 'success',
            'bg-amber-600': variant === 'warning',
            'bg-rose-600': variant === 'critical',
            'bg-slate-500': variant === 'neutral',
            'bg-blue-600': variant === 'info',
          })}
        />
      )}
      {children}
    </span>
  );
}
