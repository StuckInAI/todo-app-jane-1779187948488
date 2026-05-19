import { useState } from 'react';
import { Plus } from 'lucide-react';
import clsx from 'clsx';
import { Priority } from '@/types';
import styles from './AddTodoForm.module.css';

type AddTodoFormProps = {
  onAdd: (text: string, priority: Priority) => void;
};

const PRIORITIES: { value: Priority; label: string }[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, priority);
    setText('');
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputRow}>
        <input
          className={styles.input}
          type="text"
          placeholder="Add a new task..."
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          autoFocus
        />
        <button
          className={styles.addBtn}
          type="submit"
          disabled={!text.trim()}
          aria-label="Add todo"
        >
          <Plus size={22} strokeWidth={2.5} />
        </button>
      </div>
      <div className={styles.priorityRow}>
        <span className={styles.priorityLabel}>Priority:</span>
        {PRIORITIES.map((p) => (
          <button
            key={p.value}
            type="button"
            className={clsx(styles.priorityBtn, styles[p.value], {
              [styles.priorityActive]: priority === p.value,
            })}
            onClick={() => setPriority(p.value)}
          >
            {p.label}
          </button>
        ))}
      </div>
    </form>
  );
}
