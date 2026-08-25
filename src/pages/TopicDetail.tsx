import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckIcon, FileTextIcon } from 'lucide-react';
import { useTopic } from '../features/topics/hooks/useTopics';
import { AppScreen } from '../components/ui/AppScreen';
import { AppHeader } from '../components/ui/AppHeader';
import { AppCard } from '../components/ui/AppCard';
import { AppButton } from '../components/ui/AppButton';
import { PrivacyNotice } from '../components/ui/PrivacyNotice';
import { ErrorState } from '../components/ui/States';
import { TopicIcon } from '../components/topic/TopicIcon';
import { useShareStore } from '../store/useShareStore';

export function TopicDetailPage() {
  const { id } = useParams<{id: string;}>();
  const navigate = useNavigate();
  const { data: topic, isPending, isError, refetch } = useTopic(id);
  const setSelectedTopic = useShareStore((state) => state.setSelectedTopic);

  useEffect(() => {
    if (topic) setSelectedTopic(topic);
  }, [topic, setSelectedTopic]);

  if (isError) {
    return (
      <AppScreen header={<AppHeader onBack={() => navigate('/home')} />}>
        <ErrorState
          title="Topic unavailable"
          description="This resource packet isn’t published right now. Try another topic."
          onRetry={() => void refetch()} />
        
      </AppScreen>);

  }

  if (isPending || !topic) {
    return (
      <AppScreen header={<AppHeader />}>
        <div className="space-y-4" aria-busy>
          <div className="h-16 w-16 animate-pulse rounded-2xl bg-surface" />
          <div className="h-8 w-1/2 animate-pulse rounded-xl bg-surface" />
          <div className="h-24 animate-pulse rounded-card bg-surface" />
          <div className="h-44 animate-pulse rounded-card bg-surface" />
        </div>
      </AppScreen>);

  }

  return (
    <AppScreen
      header={<AppHeader />}
      footer={
      <div className="space-y-3">
          <AppButton onClick={() => navigate('/send/recipient')}>
            Send this resource
          </AppButton>
          <PrivacyNotice className="justify-center text-center">
            Sent anonymously — always.
          </PrivacyNotice>
        </div>
      }>
      
      <TopicIcon icon={topic.icon} tone={topic.tone} size="lg" />
      <h1 className="mt-5 text-display font-semibold text-ink">{topic.name}</h1>
      <p className="mt-3 text-body text-ink-secondary">{topic.intro}</p>

      <AppCard className="mt-7">
        <div className="flex items-center gap-2.5">
          <FileTextIcon
            aria-hidden
            className="h-4.5 w-4.5 text-primary"
            strokeWidth={1.75} />
          
          <h2 className="text-h3 font-semibold text-ink">
            What they’ll receive
          </h2>
        </div>
        <p className="mt-1.5 text-caption text-ink-tertiary">
          {topic.packetTitle} · reviewed educational packet
        </p>
        <ul className="mt-4 space-y-3">
          {topic.packetItems.map((item) =>
          <li key={item} className="flex items-start gap-3">
              <span
              aria-hidden
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mist text-primary">
              
                <CheckIcon className="h-3 w-3" strokeWidth={2.5} />
              </span>
              <span className="text-small text-ink-secondary">{item}</span>
            </li>
          )}
        </ul>
      </AppCard>

      <p className="mt-5 text-caption leading-relaxed text-ink-tertiary">
        Resources are educational only and are not a substitute for professional
        medical advice, diagnosis or treatment.
      </p>
    </AppScreen>);

}