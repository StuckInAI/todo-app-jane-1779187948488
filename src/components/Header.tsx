import { CheckSquare } from 'lucide-react';
import styles from './Header.module.css';

type HeaderProps = {
  activeCount: number;
  totalCount: number;
};

export default function Header({ activeCount, totalCount }: HeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <CheckSquare size={32} color="var(--color-primary)" strokeWidth={2.5} />
        <h1 className={styles.title}>My Todos</h1>
      </div>
      <p className={styles.subtitle}>
        {totalCount === 0
          ? 'Add your first task below'
          : `${activeCount} of ${totalCount} task${totalCount !== 1 ? 's' : ''} remaining`}
      </p>
    </div>
  );
}
