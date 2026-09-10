import React from 'react';
import { Button } from './Button';
import { cn } from '@/shared/utils/cn';

export interface EmptyStateProps {
  icon: React.ElementType;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-10 text-center bg-surface-elevated rounded-lg border border-border-subdued',
        className
      )}
    >
      <div className="w-12 h-12 rounded-full bg-surface-subdued border border-border-structural flex items-center justify-center text-text-muted mb-3">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-sm font-semibold text-text-primary tracking-tight mb-1">{title}</h3>
      <p className="text-xs text-text-secondary max-w-sm mb-4 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction} className="text-xs">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
