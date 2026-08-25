import React from 'react';
import { CloudOffIcon, InboxIcon } from 'lucide-react';
import { AppButton } from './AppButton';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: {label: string;onClick: () => void;};
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center px-6 py-14 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-mist text-primary">
        {icon ?? <InboxIcon aria-hidden className="h-7 w-7" />}
      </div>
      <h2 className="text-h3 font-semibold text-ink">{title}</h2>
      <p className="mt-2 max-w-[280px] text-small text-ink-secondary">{description}</p>
      {action &&
      <AppButton
        variant="secondary"
        fullWidth={false}
        className="mt-6"
        onClick={action.onClick}>
        
          {action.label}
        </AppButton>
      }
    </div>);

}

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'We couldn’t load this right now. Please check your connection and try again.',
  onRetry
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center px-6 py-14 text-center" role="alert">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-danger-soft text-danger">
        <CloudOffIcon aria-hidden className="h-7 w-7" />
      </div>
      <h2 className="text-h3 font-semibold text-ink">{title}</h2>
      <p className="mt-2 max-w-[280px] text-small text-ink-secondary">{description}</p>
      {onRetry &&
      <AppButton
        variant="outline"
        fullWidth={false}
        className="mt-6"
        onClick={onRetry}>
        
          Try again
        </AppButton>
      }
    </div>);

}

export function TopicSkeleton() {
  return (
    <ul className="space-y-3" aria-hidden>
      {Array.from({ length: 5 }).map((_, index) =>
      <li
        key={index}
        className="h-[92px] animate-pulse rounded-card bg-surface ring-1 ring-line/60" />

      )}
    </ul>);

}