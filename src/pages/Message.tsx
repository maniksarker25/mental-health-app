import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppScreen } from '../components/ui/AppScreen';
import { AppHeader } from '../components/ui/AppHeader';
import { AppButton } from '../components/ui/AppButton';
import { AppTextArea } from '../components/ui/AppInput';
import { PrivacyNotice } from '../components/ui/PrivacyNotice';
import { useShareStore } from '../store/useShareStore';
import { MESSAGE_MAX_LENGTH } from '../utils/validators';

const suggestions = [
'Someone cares about you and wanted to share this.',
'I thought this information might be helpful.',
'You don’t have to go through everything alone.'];


export function MessagePage() {
  const navigate = useNavigate();
  const storedMessage = useShareStore((state) => state.message);
  const setMessage = useShareStore((state) => state.setMessage);
  const [draft, setDraft] = useState(storedMessage);

  const trimmed = draft.trim();
  const tooLong = trimmed.length > MESSAGE_MAX_LENGTH;
  const remaining = MESSAGE_MAX_LENGTH - draft.length;

  const handleContinue = () => {
    if (tooLong) return;
    setMessage(trimmed);
    navigate('/send/review');
  };

  return (
    <AppScreen
      header={<AppHeader title="Add a note" step={{ current: 2, total: 3 }} />}
      footer={
      <div className="space-y-2">
          <AppButton onClick={handleContinue} disabled={tooLong}>
            Continue
          </AppButton>
          <AppButton
          variant="ghost"
          onClick={() => {
            setMessage('');
            navigate('/send/review');
          }}>
          
            Skip — send without a note
          </AppButton>
        </div>
      }>
      
      <p className="mb-6 text-small text-ink-secondary">
        A short line of warmth often matters more than the resource itself. This
        is optional.
      </p>

      <AppTextArea
        label="Supportive message"
        rows={5}
        maxLength={MESSAGE_MAX_LENGTH + 40}
        placeholder="Add a short supportive message..."
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        error={
        tooLong ? `Keep it under ${MESSAGE_MAX_LENGTH} characters.` : undefined
        } />
      
      <p
        className={
        remaining < 0 ?
        'mt-2 text-right text-caption font-medium text-danger' :
        'mt-2 text-right text-caption text-ink-tertiary'
        }
        aria-live="polite">
        
        {draft.length} / {MESSAGE_MAX_LENGTH}
      </p>

      <h2 className="mb-3 mt-6 text-h3 font-semibold text-ink">
        Or use a suggestion
      </h2>
      <ul className="space-y-2.5">
        {suggestions.map((suggestion) => {
          const active = trimmed === suggestion;
          return (
            <li key={suggestion}>
              <button
                type="button"
                onClick={() => setDraft(suggestion)}
                aria-pressed={active}
                className={
                active ?
                'w-full rounded-2xl bg-primary-tint px-4 py-3.5 text-left text-small text-primary-dark ring-1 ring-primary/30 transition-colors duration-150 ease-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40' :
                'w-full rounded-2xl bg-surface px-4 py-3.5 text-left text-small text-ink-secondary ring-1 ring-line transition-colors duration-150 ease-soft hover:bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40'
                }>
                
                “{suggestion}”
              </button>
            </li>);

        })}
      </ul>

      <PrivacyNotice className="mt-6" tone="soft" icon="lock">
        The recipient will see this message, but they will not see who sent it.
      </PrivacyNotice>
    </AppScreen>);

}