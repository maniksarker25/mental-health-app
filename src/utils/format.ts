import { format, isToday, isYesterday } from 'date-fns';

export function formatSentDate(iso: string): string {
  const date = new Date(iso);
  if (isToday(date)) return `Today, ${format(date, 'h:mm a')}`;
  if (isYesterday(date)) return `Yesterday, ${format(date, 'h:mm a')}`;
  return format(date, 'MMM d, yyyy');
}

export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ');
}