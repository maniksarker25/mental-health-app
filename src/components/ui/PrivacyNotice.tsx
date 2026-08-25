import React from 'react';
import { LockIcon, ShieldCheckIcon } from 'lucide-react';
import { cn } from '../../utils/format';

interface PrivacyNoticeProps {
  children: React.ReactNode;
  tone?: 'quiet' | 'soft';
  icon?: 'shield' | 'lock';
  className?: string;
}

export function PrivacyNotice({
  children,
  tone = 'quiet',
  icon = 'shield',
  className
}: PrivacyNoticeProps) {
  const Icon = icon === 'lock' ? LockIcon : ShieldCheckIcon;

  return (
    <p
      className={cn(
        'flex items-start gap-2.5 rounded-2xl px-4 py-3 text-small',
        tone === 'soft' ?
        'bg-primary-tint text-primary-dark' :
        'text-ink-secondary',
        className
      )}>
      
      <Icon
        aria-hidden
        className={cn(
          'mt-0.5 h-4 w-4 shrink-0',
          tone === 'soft' ? 'text-primary' : 'text-sage'
        )} />
      
      <span>{children}</span>
    </p>);

}