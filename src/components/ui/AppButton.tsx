import React from 'react';
import { motion } from 'framer-motion';
import { Loader2Icon } from 'lucide-react';
import { cn } from '../../utils/format';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';

interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-primary text-ink-inverse hover:bg-primary-dark',
  secondary: 'bg-primary-soft text-primary-dark hover:bg-mist',
  outline: 'bg-surface text-ink border border-line hover:bg-elevated',
  ghost: 'bg-transparent text-primary-dark hover:bg-primary-tint',
  destructive: 'bg-danger-soft text-danger hover:bg-[#EFDAD7]'
};

export function AppButton({
  variant = 'primary',
  loading = false,
  fullWidth = true,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  ...rest
}: AppButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <motion.button
      whileTap={isDisabled ? undefined : { scale: 0.975 }}
      transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
      className={cn(
        'inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl px-5 text-[15px] font-semibold',
        'transition-colors duration-150 ease-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
        variantClasses[variant],
        fullWidth && 'w-full',
        isDisabled && 'pointer-events-none opacity-45',
        className
      )}
      disabled={isDisabled}
      aria-busy={loading}
      {...rest as React.ComponentProps<typeof motion.button>}>
      
      {loading ?
      <Loader2Icon aria-hidden className="h-4 w-4 animate-spin" /> :

      leftIcon
      }
      <span>{children}</span>
      {!loading && rightIcon}
    </motion.button>);

}