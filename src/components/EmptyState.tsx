import { ClipboardList } from 'lucide-react';
import { FilterType } from '@/types';
import styles from './EmptyState.module.css';

type EmptyStateProps = {
  filter: FilterType;
};

const MESSAGES: Record<FilterType, { title: string; subtitle: string }> = {
  all: {
    title: 'No tasks yet',
    subtitle: 'Add a task above to get started!',
  },
  active: {
    title: 'All caught up!',
    subtitle: 'No active tasks — great work!',
  },
  completed: {
    title: 'No completed tasks',
    subtitle: 'Complete a task to see it here.',
  },
};

export default function EmptyState({ filter }: EmptyStateProps) {
  const msg = MESSAGES[filter];
  return (
    <div className={styles.empty}>
      <ClipboardList size={48} color="var(--color-text-light)" strokeWidth={1.5} />
      <h2 className={styles.title}>{msg.title}</h2>
      <p className={styles.subtitle}>{msg.subtitle}</p>
    </div>
  );
}
