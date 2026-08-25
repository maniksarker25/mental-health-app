import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2Icon, ClockIcon, XCircleIcon } from 'lucide-react';
import { AppCard } from '../components/ui/AppCard';
import { EmptyState } from '../components/ui/States';
import { useAppStore } from '../store/useAppStore';
import { formatSentDate } from '../utils/format';

export function HistoryPage() {
  const navigate = useNavigate();
  const history = useAppStore((state) => state.history);

  return (
    <div className="flex h-full flex-col bg-canvas">
      <header className="shrink-0 px-5 pb-3 pt-6">
        <h1 className="text-h1 font-semibold text-ink">Send history</h1>
        <p className="mt-1.5 text-small text-ink-secondary">
          Stored only on this device. Recipient details stay masked.
        </p>
      </header>

      <div className="app-scroll min-h-0 flex-1 overflow-y-auto px-5 pb-6">
        {history.length === 0 ?
        <EmptyState
          icon={<ClockIcon aria-hidden className="h-7 w-7" />}
          title="Nothing sent yet"
          description="When you share a resource, a masked record will appear here so you can keep track."
          action={{ label: 'Choose a topic', onClick: () => navigate('/home') }} /> :


        <ul className="space-y-3">
            {history.map((entry) => {
            const sent = entry.status === 'SENT';
            return (
              <AppCard as="li" key={entry.id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-h3 font-semibold text-ink">
                        {entry.topicName}
                      </p>
                      <p className="mt-1 truncate text-small text-ink-secondary">
                        {entry.method === 'EMAIL' ? 'Email' : 'SMS'} ·{' '}
                        {entry.maskedRecipient}
                      </p>
                      <p className="mt-1 text-caption text-ink-tertiary">
                        {formatSentDate(entry.sentAt)}
                      </p>
                    </div>
                    <span
                    className={
                    sent ?
                    'flex shrink-0 items-center gap-1.5 rounded-full bg-mist px-2.5 py-1 text-caption font-semibold text-primary-dark' :
                    'flex shrink-0 items-center gap-1.5 rounded-full bg-danger-soft px-2.5 py-1 text-caption font-semibold text-danger'
                    }>
                    
                      {sent ?
                    <CheckCircle2Icon aria-hidden className="h-3.5 w-3.5" /> :

                    <XCircleIcon aria-hidden className="h-3.5 w-3.5" />
                    }
                      {sent ? 'Sent' : 'Failed'}
                    </span>
                  </div>
                </AppCard>);

          })}
          </ul>
        }
      </div>
    </div>);

}