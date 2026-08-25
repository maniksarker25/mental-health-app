import React from 'react';
import { NavLink } from 'react-router-dom';
import { ClockIcon, HomeIcon, SettingsIcon } from 'lucide-react';

const items = [
{ to: '/home', label: 'Home', Icon: HomeIcon },
{ to: '/history', label: 'History', Icon: ClockIcon },
{ to: '/settings', label: 'Settings', Icon: SettingsIcon }];


export function BottomNav() {
  return (
    <nav
      aria-label="Primary"
      className="shrink-0 border-t border-line/70 bg-surface/95 px-4 pb-5 pt-2 backdrop-blur">
      
      <ul className="flex items-stretch">
        {items.map(({ to, label, Icon }) =>
        <li key={to} className="flex-1">
            <NavLink
            to={to}
            className={({ isActive }) =>
            [
            'flex min-h-[52px] flex-col items-center justify-center gap-1 rounded-2xl text-caption font-medium',
            'transition-colors duration-150 ease-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
            isActive ? 'text-primary' : 'text-ink-tertiary hover:text-ink-secondary'].
            join(' ')
            }>
            
              {({ isActive }) =>
            <>
                  <Icon
                aria-hidden
                className="h-5 w-5"
                strokeWidth={isActive ? 2.2 : 1.75} />
              
                  {label}
                </>
            }
            </NavLink>
          </li>
        )}
      </ul>
    </nav>);

}