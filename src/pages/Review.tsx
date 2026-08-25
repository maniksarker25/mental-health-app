import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckIcon, PencilIcon } from 'lucide-react';
import { AppScreen } from '../components/ui/AppScreen';
import { AppHeader } from '../components/ui/AppHeader';
import { AppCard } from '../components/ui/AppCard';
import { AppButton } from '../components/ui/AppButton';
import { PrivacyNotice } from '../components/ui/PrivacyNotice';
import { TopicIcon } from '../components/topic/TopicIcon';
import {
  getRecipientMasked,
  getRecipientRaw,
  useShareStore } from
'../store/useShareStore';
import { useAppStore } from '../store/useAppStore';
import { useCreateAnonymousShare } from '../features/sharing/hooks/useCreateAnonymousShare';

function Row({
  label,
  value,
  onEdit,
  editLabel





}: {label: string;value: React.ReactNode;onEdit: () => void;editLabel: string;}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-line/70 py-4 last:border-b-0">
      <div className="min-w-0">
        <p className="text-caption uppercase tracking-[0.1em] text-ink-tertiary">
          {label}
        </p>
        <div className="mt-1 text-body font-medium text-ink">{value}</div>
      </div>
      <button
        type="button"
        onClick={onEdit}
        aria-label={editLabel}
        className="flex min-h-[36px] shrink-0 items-center gap-1.5 rounded-full bg-elevated px-3 text-caption font-semibold text-primary-dark ring-1 ring-line transition-colors duration-150 ease-soft hover:bg-primary-tint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40">
        
        <PencilIcon aria-hidden className="h-3 w-3" />
        Edit
      </button>
    </div>);

}

export function ReviewPage() {
  const navigate = useNavigate();
  const { selectedTopic, recipient, message, resetShareFlow } = useShareStore();
  const addHistoryEntry = useAppStore((state) => state.addHistoryEntry);
  const { mutate, isPending, isError, reset } = useCreateAnonymousShare();
  const [acknowledged, setAcknowledged] = useState(false);

  useEffect(() => {
    if (!selectedTopic || !recipient) navigate('/home', { replace: true });
  }, [selectedTopic, recipient, navigate]);

  if (!selectedTopic || !recipient) return null;

  const masked = getRecipientMasked(recipient);

  const handleSend = () => {
    if (isPending || !acknowledged) return;
    mutate(
      {
        topicId: selectedTopic.id,
        deliveryMethod: recipient.method,
        recipient: getRecipientRaw(recipient),
        message: message || undefined
      },
      {
        onSuccess: (response) => {
          addHistoryEntry({
            id: response.shareId,
            topicId: selectedTopic.id,
            topicName: selectedTopic.name,
            method: recipient.method,
            maskedRecipient: masked,
            sentAt: new Date().toISOString(),
            status: response.status
          });
          resetShareFlow();
          navigate('/send/success', {
            replace: true,
            state: { topicName: selectedTopic.name, method: recipient.method }
          });
        }
      }
    );
  };

  return (
    <AppScreen
      header={<AppHeader title="Review" step={{ current: 3, total: 3 }} />}
      footer={
      <AppButton
        onClick={handleSend}
        loading={isPending}
        disabled={!acknowledged}>
        
          {isPending ? 'Sending anonymously…' : 'Send anonymously'}
        </AppButton>
      }>
      
      <AppCard className="pt-1">
        <Row
          label="Topic"
          value={
          <span className="flex items-center gap-2.5">
              <TopicIcon
              icon={selectedTopic.icon}
              tone={selectedTopic.tone}
              size="sm" />
            
              {selectedTopic.name}
            </span>
          }
          editLabel="Edit topic"
          onEdit={() => navigate('/home')} />
        
        <Row
          label="Send via"
          value={recipient.method === 'EMAIL' ? 'Email' : 'Text message'}
          editLabel="Edit delivery method"
          onEdit={() => navigate('/send/recipient')} />
        
        <Row
          label="Recipient"
          value={masked}
          editLabel="Edit recipient"
          onEdit={() => navigate('/send/recipient')} />
        
        <Row
          label="Message"
          value={
          message ?
          <span className="text-ink-secondary">“{message}”</span> :

          <span className="text-ink-tertiary">No message added</span>

          }
          editLabel="Edit message"
          onEdit={() => navigate('/send/message')} />
        
      </AppCard>

      {isPending &&
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
        className="mt-4 flex items-center gap-3 rounded-2xl bg-primary-tint px-4 py-3.5"
        aria-live="polite">
        
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/50" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
          </span>
          <p className="text-small text-primary-dark">
            Creating a secure link and delivering it…
          </p>
        </motion.div>
      }

      {isError &&
      <div
        role="alert"
        className="mt-4 rounded-2xl bg-danger-soft px-4 py-3.5 text-small text-danger">
        
          We couldn’t send the resource right now. Please check your connection
          and try again.
          <button
          type="button"
          onClick={() => reset()}
          className="mt-2 block font-semibold underline underline-offset-2">
          
            Dismiss and retry
          </button>
        </div>
      }

      <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl bg-surface p-4 ring-1 ring-line">
        <span
          className={
          acknowledged ?
          'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-primary text-ink-inverse' :
          'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-elevated ring-1 ring-line'
          }>
          
          {acknowledged && <CheckIcon aria-hidden className="h-3 w-3" strokeWidth={3} />}
        </span>
        <input
          type="checkbox"
          className="sr-only"
          checked={acknowledged}
          onChange={(event) => setAcknowledged(event.target.checked)} />
        
        <span className="text-small text-ink-secondary">
          I understand this is an educational resource and not professional
          medical advice.
        </span>
      </label>

      <PrivacyNotice className="mt-4" tone="soft">
        Sent anonymously. Your name, email and number are never attached.
      </PrivacyNotice>
    </AppScreen>);

}