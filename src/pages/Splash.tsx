import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';

const LOGO = "/5a250f88-b844-47cb-b8e7-ec8fb437d85b.jpg";


export function SplashPage() {
  const navigate = useNavigate();
  const onboardingComplete = useAppStore((state) => state.onboardingComplete);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      navigate(onboardingComplete ? '/home' : '/onboarding', { replace: true });
    }, 1700);
    return () => window.clearTimeout(timer);
  }, [navigate, onboardingComplete]);

  return (
    <div className="flex h-full flex-col items-center justify-center bg-canvas px-8">
      <motion.img
        src={LOGO}
        alt=""
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        className="h-28 w-28 rounded-3xl object-cover mix-blend-multiply" />
      
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}
        className="mt-6 text-center">
        
        <h1 className="text-h1 font-semibold text-ink">Mental Health Anonymous</h1>
        <p className="mt-2 text-small text-ink-secondary">
          Care, shared quietly.
        </p>
      </motion.div>
    </div>);

}