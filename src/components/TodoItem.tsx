import { useState } from 'react';
import { Trash2, Pencil, Check, X } from 'lucide-react';
import clsx from 'clsx';
import { Todo } from '@/types';
import styles from './TodoItem.module.css';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  function handleEditSubmit(): void {
    if (editText.trim()) {
      onEdit(todo.id, editText);
    } else {
      setEditText(todo.text);
    }
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter') handleEditSubmit();
    if (e.key === 'Escape') {
      setEditText(todo.text);
      setEditing(false);
    }
  }

  return (
    <li className={clsx(styles.item, { [styles.completed]: todo.completed })}>
      <button
        className={clsx(styles.checkbox, { [styles.checked]: todo.completed })}
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {todo.completed && <Check size={13} strokeWidth={3} />}
      </button>

      <div className={styles.content}>
        {editing ? (
          <input
            className={styles.editInput}
            value={editText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <span
            className={clsx(styles.text, { [styles.textCompleted]: todo.completed })}
            onDoubleClick={() => { setEditing(true); setEditText(todo.text); }}
          >
            {todo.text}
          </span>
        )}
        <span className={clsx(styles.priority, styles[todo.priority])}>
          {todo.priority}
        </span>
      </div>

      <div className={styles.actions}>
        {editing ? (
          <>
            <button className={clsx(styles.actionBtn, styles.saveBtn)} onClick={handleEditSubmit} aria-label="Save">
              <Check size={15} strokeWidth={2.5} />
            </button>
            <button
              className={clsx(styles.actionBtn, styles.cancelBtn)}
              onClick={() => { setEditText(todo.text); setEditing(false); }}
              aria-label="Cancel"
            >
              <X size={15} strokeWidth={2.5} />
            </button>
          </>
        ) : (
          <>
            <button
              className={clsx(styles.actionBtn, styles.editBtn)}
              onClick={() => { setEditing(true); setEditText(todo.text); }}
              aria-label="Edit"
            >
              <Pencil size={15} strokeWidth={2} />
            </button>
            <button
              className={clsx(styles.actionBtn, styles.deleteBtn)}
              onClick={() => onDelete(todo.id)}
              aria-label="Delete"
            >
              <Trash2 size={15} strokeWidth={2} />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
