import React from 'react';
import { cn } from '@/shared/utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, rightElement, error, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {icon && (
          <div className="absolute left-3 text-text-muted pointer-events-none flex items-center justify-center">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full h-10 bg-surface-elevated text-text-primary text-sm rounded-md border border-border-structural',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all',
            'placeholder:text-text-muted',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            icon ? 'pl-9' : 'pl-3',
            rightElement ? 'pr-10' : 'pr-3',
            error && 'border-critical focus:ring-critical',
            className
          )}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-2 flex items-center justify-center">
            {rightElement}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
