import React from 'react';
import { cn } from '../../utils/format';

interface AppCardProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'li';
  padded?: boolean;
}

export function AppCard({
  children,
  className,
  as: Tag = 'div',
  padded = true
}: AppCardProps) {
  return (
    <Tag
      className={cn(
        'rounded-card bg-surface shadow-card ring-1 ring-line/70',
        padded && 'p-5',
        className
      )}>
      
      {children}
    </Tag>);

}