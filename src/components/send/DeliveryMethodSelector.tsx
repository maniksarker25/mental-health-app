import React from 'react';
import { MailIcon, MessageSquareIcon } from 'lucide-react';
import type { DeliveryMethod } from '../../types';
import { cn } from '../../utils/format';

interface DeliveryMethodSelectorProps {
  value: DeliveryMethod;
  onChange: (method: DeliveryMethod) => void;
}

const options: Array<{
  value: DeliveryMethod;
  label: string;
  hint: string;
  Icon: typeof MailIcon;
}> = [
{ value: 'EMAIL', label: 'Email', hint: 'Sent to an inbox', Icon: MailIcon },
{ value: 'SMS', label: 'Text message', hint: 'Sent to a phone', Icon: MessageSquareIcon }];


export function DeliveryMethodSelector({
  value,
  onChange
}: DeliveryMethodSelectorProps) {
  return (
    <div role="radiogroup" aria-label="Delivery method" className="grid grid-cols-2 gap-3">
      {options.map(({ value: option, label, hint, Icon }) => {
        const selected = option === value;
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option)}
            className={cn(
              'flex min-h-[92px] flex-col items-start justify-center gap-1 rounded-2xl px-4 py-3 text-left',
              'transition-colors duration-150 ease-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
              selected ?
              'bg-primary text-ink-inverse ring-1 ring-primary' :
              'bg-surface text-ink ring-1 ring-line hover:bg-elevated'
            )}>
            
            <Icon
              aria-hidden
              className={cn('h-5 w-5', selected ? 'text-sage' : 'text-ink-tertiary')}
              strokeWidth={1.75} />
            
            <span className="text-body font-semibold">{label}</span>
            <span
              className={cn(
                'text-caption',
                selected ? 'text-mist/80' : 'text-ink-secondary'
              )}>
              
              {hint}
            </span>
          </button>);

      })}
    </div>);

}