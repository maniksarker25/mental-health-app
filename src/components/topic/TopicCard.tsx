import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRightIcon } from 'lucide-react';
import type { Topic } from '../../types';
import { TopicIcon } from './TopicIcon';

interface TopicCardProps {
  topic: Topic;
  onSelect: (topic: Topic) => void;
}

export function TopicCard({ topic, onSelect }: TopicCardProps) {
  return (
    <li>
      <motion.button
        type="button"
        onClick={() => onSelect(topic)}
        whileTap={{ scale: 0.985 }}
        transition={{ duration: 0.14, ease: [0.23, 1, 0.32, 1] }}
        aria-label={`${topic.name}. ${topic.shortDescription}`}
        className="group flex w-full items-center gap-4 rounded-card bg-surface p-4 text-left shadow-card ring-1 ring-line/70 transition-colors duration-150 ease-soft hover:bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40">
        
        <TopicIcon icon={topic.icon} tone={topic.tone} />
        <span className="min-w-0 flex-1">
          <span className="block text-h3 font-semibold text-ink">{topic.name}</span>
          <span className="mt-0.5 block truncate text-small text-ink-secondary">
            {topic.shortDescription}
          </span>
        </span>
        <ArrowUpRightIcon
          aria-hidden
          className="h-4.5 w-4.5 shrink-0 text-ink-tertiary transition-colors duration-150 ease-soft group-hover:text-primary" />
        
      </motion.button>
    </li>);

}