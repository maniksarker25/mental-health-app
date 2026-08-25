import React, { useState } from 'react';
import {
  BellIcon,
  ChevronRightIcon,
  FileTextIcon,
  InfoIcon,
  LifeBuoyIcon,
  ScaleIcon,
  Trash2Icon } from
'lucide-react';
import { AppCard } from '../components/ui/AppCard';
import { AppButton } from '../components/ui/AppButton';
import { useAppStore } from '../store/useAppStore';

const links = [
{ label: 'About', Icon: InfoIcon },
{ label: 'Privacy Policy', Icon: FileTextIcon },
{ label: 'Terms & Conditions', Icon: ScaleIcon },
{ label: 'Help & Support', Icon: LifeBuoyIcon }];


export function SettingsPage() {
  const { notificationsEnabled, setNotificationsEnabled, history, clearHistory } =
  useAppStore();
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="flex h-full flex-col bg-canvas">
      <header className="shrink-0 px-5 pb-3 pt-6">
        <h1 className="text-h1 font-semibold text-ink">Settings</h1>
      </header>

      <div className="app-scroll min-h-0 flex-1 space-y-4 overflow-y-auto px-5 pb-6">
        <AppCard padded={false} className="overflow-hidden">
          <div className="flex items-center justify-between gap-4 px-4 py-4">
            <span className="flex items-center gap-3">
              <BellIcon
                aria-hidden
                className="h-4.5 w-4.5 text-ink-tertiary"
                strokeWidth={1.75} />
              
              <span>
                <span className="block text-body font-medium text-ink">
                  Delivery updates
                </span>
                <span className="block text-caption text-ink-secondary">
                  Notify me when a resource is delivered
                </span>
              </span>
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={notificationsEnabled}
              aria-label="Delivery updates"
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={
              notificationsEnabled ?
              'relative h-7 w-12 shrink-0 rounded-full bg-primary transition-colors duration-150 ease-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40' :
              'relative h-7 w-12 shrink-0 rounded-full bg-line transition-colors duration-150 ease-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40'
              }>
              
              <span
                className="absolute top-1 h-5 w-5 rounded-full bg-surface shadow-sm transition-transform duration-200 ease-soft"
                style={{
                  transform: notificationsEnabled ?
                  'translateX(26px)' :
                  'translateX(4px)'
                }} />
              
            </button>
          </div>
        </AppCard>

        <AppCard padded={false} className="overflow-hidden">
          <ul>
            {links.map(({ label, Icon }, index) =>
            <li key={label}>
                <button
                type="button"
                className={
                index === 0 ?
                'flex min-h-[54px] w-full items-center gap-3 px-4 text-left transition-colors duration-150 ease-soft hover:bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/40' :
                'flex min-h-[54px] w-full items-center gap-3 border-t border-line/70 px-4 text-left transition-colors duration-150 ease-soft hover:bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/40'
                }>
                
                  <Icon
                  aria-hidden
                  className="h-4.5 w-4.5 text-ink-tertiary"
                  strokeWidth={1.75} />
                
                  <span className="flex-1 text-body text-ink">{label}</span>
                  <ChevronRightIcon
                  aria-hidden
                  className="h-4 w-4 text-ink-tertiary" />
                
                </button>
              </li>
            )}
          </ul>
        </AppCard>

        <AppCard>
          <h2 className="text-h3 font-semibold text-ink">Local history</h2>
          <p className="mt-1.5 text-small text-ink-secondary">
            {history.length > 0 ?
            `${history.length} masked record${history.length === 1 ? '' : 's'} stored on this device.` :
            'No records stored on this device.'}
          </p>
          {confirming ?
          <div className="mt-4 space-y-2.5">
              <p className="text-small text-ink-secondary">
                This permanently removes your local send history. It can’t be
                undone.
              </p>
              <AppButton
              variant="destructive"
              leftIcon={<Trash2Icon aria-hidden className="h-4 w-4" />}
              onClick={() => {
                clearHistory();
                setConfirming(false);
              }}>
              
                Yes, clear history
              </AppButton>
              <AppButton variant="ghost" onClick={() => setConfirming(false)}>
                Cancel
              </AppButton>
            </div> :

          <AppButton
            className="mt-4"
            variant="outline"
            leftIcon={<Trash2Icon aria-hidden className="h-4 w-4" />}
            disabled={history.length === 0}
            onClick={() => setConfirming(true)}>
            
              Clear local history
            </AppButton>
          }
        </AppCard>

        <p className="pb-2 text-center text-caption text-ink-tertiary">
          Mental Health Anonymous · Version 1.0.0
        </p>
      </div>
    </div>);

}