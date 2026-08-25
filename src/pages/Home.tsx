import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchXIcon, SettingsIcon } from 'lucide-react';
import { useTopics } from '../features/topics/hooks/useTopics';
import { TopicCard } from '../components/topic/TopicCard';
import { PrivacyNotice } from '../components/ui/PrivacyNotice';
import { EmptyState, ErrorState, TopicSkeleton } from '../components/ui/States';
import { useShareStore } from '../store/useShareStore';
import type { Topic } from '../types';

export function HomePage() {
  const navigate = useNavigate();
  const { data, isPending, isError, refetch } = useTopics();
  const setSelectedTopic = useShareStore((state) => state.setSelectedTopic);
  const resetShareFlow = useShareStore((state) => state.resetShareFlow);

  const handleSelect = useCallback(
    (topic: Topic) => {
      resetShareFlow();
      setSelectedTopic(topic);
      navigate(`/topics/${topic.id}`);
    },
    [navigate, resetShareFlow, setSelectedTopic]
  );

  return (
    <div className="flex h-full flex-col bg-canvas">
      <header className="shrink-0 px-5 pb-4 pt-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-caption font-semibold uppercase tracking-[0.14em] text-sage">
              Anonymous
            </p>
            <h1 className="mt-1.5 text-display font-semibold text-ink">
              How can we help today?
            </h1>
            <p className="mt-2 max-w-[280px] text-small text-ink-secondary">
              Pick a topic and we’ll send someone a private link to trusted
              educational resources.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/settings')}
            aria-label="Settings"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface text-ink-secondary ring-1 ring-line transition-colors duration-150 ease-soft hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40">
            
            <SettingsIcon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>
      </header>

      <div className="app-scroll min-h-0 flex-1 overflow-y-auto px-5 pb-6">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-h3 font-semibold text-ink">Choose a topic</h2>
          {data &&
          <span className="text-caption text-ink-tertiary">
              {data.length} resources
            </span>
          }
        </div>

        {isPending && <TopicSkeleton />}

        {isError &&
        <ErrorState
          title="Topics didn’t load"
          description="We couldn’t reach our library just now. Check your connection and try again."
          onRetry={() => void refetch()} />

        }

        {data && data.length === 0 &&
        <EmptyState
          icon={<SearchXIcon aria-hidden className="h-7 w-7" />}
          title="No topics available"
          description="New resource packets are being published. Please check back shortly."
          action={{ label: 'Refresh', onClick: () => void refetch() }} />

        }

        {data && data.length > 0 &&
        <>
            <ul className="space-y-3">
              {data.map((topic) =>
            <TopicCard key={topic.id} topic={topic} onSelect={handleSelect} />
            )}
            </ul>
            <PrivacyNotice className="mt-5" tone="soft">
              Your identity is never shared with the recipient.
            </PrivacyNotice>
          </>
        }
      </div>
    </div>);

}