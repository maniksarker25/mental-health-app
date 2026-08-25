import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AppButton } from '../components/ui/AppButton';
import { useAppStore } from '../store/useAppStore';

interface Slide {
  image: string;
  title: string;
  body: string;
}

const slides: Slide[] = [
{
  image: "/24efcec5-7768-4107-a6b1-a1692caf804f.jpg",

  title: 'Share something that helps',
  body: 'Choose a mental-health topic and send trusted, plain-language information to someone you care about.'
},
{
  image: "/76d1e3a1-7223-4bd9-8d84-01d8a0adf209.jpg",

  title: 'Send it anonymously',
  body: 'Your name, number and email are never included. They receive the resource, not your identity.'
},
{
  image: "/189d3bad-21fb-4ed3-b768-5573b3a4d077.jpg",

  title: 'They open a secure link',
  body: 'No app, no account. A private web link takes them straight to reviewed educational resources.'
}];


export function OnboardingPage() {
  const navigate = useNavigate();
  const completeOnboarding = useAppStore((state) => state.completeOnboarding);
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const isLast = index === slides.length - 1;

  const finish = () => {
    completeOnboarding();
    navigate('/home', { replace: true });
  };

  return (
    <div className="flex h-full flex-col bg-canvas px-6 pb-8 pt-5">
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={finish}
          className="min-h-[44px] rounded-full px-3 text-small font-semibold text-ink-secondary transition-colors duration-150 ease-soft hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40">
          
          Skip
        </button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={slide.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}>
            
            <img
              src={slide.image}
              alt=""
              className="mx-auto h-56 w-56 rounded-[36px] object-cover mix-blend-multiply" />
            
            <h1 className="mt-10 text-display font-semibold text-ink">
              {slide.title}
            </h1>
            <p className="mt-3 text-body text-ink-secondary">{slide.body}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div
        className="mb-6 flex gap-2"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={slides.length}
        aria-valuenow={index + 1}
        aria-label={`Slide ${index + 1} of ${slides.length}`}>
        
        {slides.map((item, slideIndex) =>
        <span
          key={item.title}
          className={
          slideIndex === index ?
          'h-1.5 w-8 rounded-full bg-primary transition-colors duration-200 ease-soft' :
          'h-1.5 w-1.5 rounded-full bg-line transition-colors duration-200 ease-soft'
          } />

        )}
      </div>

      <AppButton onClick={isLast ? finish : () => setIndex(index + 1)}>
        {isLast ? 'Get started' : 'Continue'}
      </AppButton>
    </div>);

}