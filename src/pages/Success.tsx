import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckIcon } from 'lucide-react';
import { AppButton } from '../components/ui/AppButton';
import { PrivacyNotice } from '../components/ui/PrivacyNotice';

interface SuccessState {
  topicName?: string;
  method?: 'EMAIL' | 'SMS';
}

export function SuccessPage() {
  const navigate = useNavigate();
  const state = (useLocation().state ?? {}) as SuccessState;
  const channel = state.method === 'SMS' ? 'text message' : 'email';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
      className="flex h-full flex-col bg-canvas px-6 pb-8 pt-6">
      
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center text-center">
        <motion.span
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-ink-inverse">
          
          <motion.span
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.22, delay: 0.14, ease: [0.23, 1, 0.32, 1] }}>
            
            <CheckIcon aria-hidden className="h-9 w-9" strokeWidth={2.2} />
          </motion.span>
        </motion.span>

        <h1 className="mt-8 text-display font-semibold text-ink" role="status">
          Resource sent successfully
        </h1>
        <p className="mt-3 max-w-[300px] text-body text-ink-secondary">
          {state.topicName ? `${state.topicName} resources are on the way. ` : ''}
          The recipient will receive a secure link by {channel} to view the
          selected educational resource.
        </p>

        <PrivacyNotice className="mt-8 justify-center" tone="soft" icon="lock">
          Your identity was not included in the message.
        </PrivacyNotice>
      </div>

      <div className="space-y-2.5">
        <AppButton onClick={() => navigate('/home')}>
          Send another resource
        </AppButton>
        <AppButton variant="ghost" onClick={() => navigate('/history')}>
          View send history
        </AppButton>
      </div>
    </motion.div>);

}