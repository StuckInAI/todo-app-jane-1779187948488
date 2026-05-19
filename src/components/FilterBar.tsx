import clsx from 'clsx';
import { FilterType } from '@/types';
import styles from './FilterBar.module.css';

type FilterBarProps = {
  filter: FilterType;
  onFilterChange: (f: FilterType) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
};

const FILTERS: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export default function FilterBar({
  filter,
  onFilterChange,
  activeCount,
  completedCount,
  onClearCompleted,
}: FilterBarProps) {
  return (
    <div className={styles.bar}>
      <div className={styles.filters}>
        {FILTERS.map((f) => (
          <button
            key={f.value}
            className={clsx(styles.filterBtn, {
              [styles.filterActive]: filter === f.value,
            })}
            onClick={() => onFilterChange(f.value)}
          >
            {f.label}
            <span className={styles.badge}>
              {f.value === 'all'
                ? activeCount + completedCount
                : f.value === 'active'
                ? activeCount
                : completedCount}
            </span>
          </button>
        ))}
      </div>
      {completedCount > 0 && (
        <button className={styles.clearBtn} onClick={onClearCompleted}>
          Clear completed
        </button>
      )}
    </div>
  );
}
