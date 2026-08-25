import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from 'lucide-react';

interface AppHeaderProps {
  title?: string;
  step?: {current: number;total: number;};
  onBack?: () => void;
  right?: React.ReactNode;
}

export function AppHeader({ title, step, onBack, right }: AppHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="shrink-0 px-5 pb-3 pt-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack ?? (() => navigate(-1))}
          aria-label="Go back"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface text-ink ring-1 ring-line transition-colors duration-150 ease-soft hover:bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40">
          
          <ChevronLeftIcon aria-hidden className="h-5 w-5" />
        </button>
        <div className="min-w-0 flex-1">
          {title &&
          <h1 className="truncate text-h3 font-semibold text-ink">{title}</h1>
          }
          {step &&
          <p className="text-caption text-ink-secondary">
              Step {step.current} of {step.total}
            </p>
          }
        </div>
        {right}
      </div>
      {step &&
      <div
        className="mt-4 flex gap-1.5"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={step.total}
        aria-valuenow={step.current}
        aria-label={`Step ${step.current} of ${step.total}`}>
        
          {Array.from({ length: step.total }).map((_, index) =>
        <span
          key={index}
          className={
          index < step.current ?
          'h-1 flex-1 rounded-full bg-primary transition-colors duration-200 ease-soft' :
          'h-1 flex-1 rounded-full bg-line transition-colors duration-200 ease-soft'
          } />

        )}
        </div>
      }
    </header>);

}