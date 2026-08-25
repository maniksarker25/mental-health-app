import React from 'react';
import {
  AnchorIcon,
  BrainIcon,
  CloudIcon,
  FlameIcon,
  HeartIcon,
  ShieldIcon,
  UtensilsIcon,
  WindIcon } from
'lucide-react';
import type { TopicTone } from '../../types';
import { cn } from '../../utils/format';

const icons = {
  wind: WindIcon,
  cloud: CloudIcon,
  flame: FlameIcon,
  shield: ShieldIcon,
  heart: HeartIcon,
  brain: BrainIcon,
  anchor: AnchorIcon,
  utensils: UtensilsIcon
} as const;

const toneClasses: Record<TopicTone, string> = {
  mist: 'bg-mist text-primary-dark',
  lavender: 'bg-lavender text-[#4B4664]',
  sky: 'bg-sky text-[#3B5B66]',
  sand: 'bg-sand text-[#6A5843]',
  blush: 'bg-blush text-[#6B4E4A]'
};

interface TopicIconProps {
  icon: string;
  tone: TopicTone;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function TopicIcon({ icon, tone, size = 'md', className }: TopicIconProps) {
  const Icon = icons[icon as keyof typeof icons] ?? HeartIcon;
  const box =
  size === 'lg' ? 'h-16 w-16' : size === 'sm' ? 'h-10 w-10' : 'h-12 w-12';
  const glyph = size === 'lg' ? 'h-7 w-7' : size === 'sm' ? 'h-4.5 w-4.5' : 'h-5 w-5';

  return (
    <span
      aria-hidden
      className={cn(
        'flex shrink-0 items-center justify-center rounded-2xl',
        box,
        toneClasses[tone],
        className
      )}>
      
      <Icon className={glyph} strokeWidth={1.75} />
    </span>);

}