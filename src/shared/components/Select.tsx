import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  error?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, error, ...props }, ref) => {
    return (
      <div className="relative inline-flex items-center w-full">
        <select
          ref={ref}
          className={cn(
            'w-full h-9 pl-3 pr-8 bg-surface-elevated text-text-primary text-xs font-medium rounded-md border border-border-structural',
            'appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all cursor-pointer',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-critical focus:ring-critical',
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2.5 w-3.5 h-3.5 text-text-muted pointer-events-none" />
      </div>
    );
  }
);

Select.displayName = 'Select';
