import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/format';

interface AppScreenProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export function AppScreen({
  children,
  header,
  footer,
  className,
  contentClassName
}: AppScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
      className={cn('flex h-full flex-col bg-canvas', className)}>
      
      {header}
      <main
        className={cn(
          'app-scroll flex-1 overflow-y-auto overscroll-contain px-5 pb-8',
          contentClassName
        )}>
        
        {children}
      </main>
      {footer &&
      <div className="border-t border-line/70 bg-canvas/95 px-5 pb-6 pt-4 backdrop-blur">
          {footer}
        </div>
      }
    </motion.div>);

}