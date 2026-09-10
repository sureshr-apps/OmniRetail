import React from 'react';
import { cn } from '@/shared/utils/cn';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn('block text-sm font-medium text-text-primary mb-1', className)}
        {...props}
      />
    );
  }
);
Label.displayName = 'Label';
