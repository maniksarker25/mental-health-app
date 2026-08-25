import React, { useId } from 'react';
import { AlertCircleIcon } from 'lucide-react';
import { cn } from '../../utils/format';

interface BaseProps {
  label: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightSlot?: React.ReactNode;
}

type AppInputProps = BaseProps &
React.InputHTMLAttributes<HTMLInputElement> & {multiline?: false;};

export const AppInput = React.forwardRef<HTMLInputElement, AppInputProps>(
  function AppInput(
  { label, helperText, error, leftIcon, rightSlot, className, ...rest },
  ref)
  {
    const id = useId();
    const describedBy = error ? `${id}-error` : helperText ? `${id}-helper` : undefined;

    return (
      <div className="w-full">
        <label
          htmlFor={id}
          className="mb-2 block text-small font-semibold text-ink">
          
          {label}
        </label>
        <div
          className={cn(
            'flex min-h-[54px] items-center gap-3 rounded-2xl bg-surface px-4 transition-colors duration-150 ease-soft',
            'ring-1',
            error ? 'ring-danger/45' : 'ring-line focus-within:ring-primary/45'
          )}>
          
          {leftIcon && <span className="text-ink-tertiary">{leftIcon}</span>}
          <input
            id={id}
            ref={ref}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            className={cn(
              'w-full bg-transparent text-body text-ink placeholder:text-ink-tertiary focus:outline-none',
              className
            )}
            {...rest} />
          
          {rightSlot}
        </div>
        {error ?
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 flex items-start gap-1.5 text-caption font-medium text-danger">
          
            <AlertCircleIcon aria-hidden className="mt-px h-3.5 w-3.5 shrink-0" />
            {error}
          </p> :
        helperText ?
        <p id={`${id}-helper`} className="mt-2 text-caption text-ink-secondary">
            {helperText}
          </p> :
        null}
      </div>);

  }
);

interface AppTextAreaProps extends
  BaseProps,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const AppTextArea = React.forwardRef<HTMLTextAreaElement, AppTextAreaProps>(
  function AppTextArea({ label, helperText, error, className, ...rest }, ref) {
    const id = useId();
    const describedBy = error ? `${id}-error` : helperText ? `${id}-helper` : undefined;

    return (
      <div className="w-full">
        <label htmlFor={id} className="mb-2 block text-small font-semibold text-ink">
          {label}
        </label>
        <textarea
          id={id}
          ref={ref}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={cn(
            'w-full resize-none rounded-2xl bg-surface p-4 text-body text-ink ring-1 transition-colors duration-150 ease-soft placeholder:text-ink-tertiary focus:outline-none',
            error ? 'ring-danger/45' : 'ring-line focus:ring-primary/45',
            className
          )}
          {...rest} />
        
        {error ?
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 flex items-start gap-1.5 text-caption font-medium text-danger">
          
            <AlertCircleIcon aria-hidden className="mt-px h-3.5 w-3.5 shrink-0" />
            {error}
          </p> :
        helperText ?
        <p id={`${id}-helper`} className="mt-2 text-caption text-ink-secondary">
            {helperText}
          </p> :
        null}
      </div>);

  }
);