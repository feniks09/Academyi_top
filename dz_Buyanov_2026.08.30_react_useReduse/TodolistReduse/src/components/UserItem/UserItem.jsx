import { useState } from 'react';
import styles from './UserItem.module.css';

export const UserItem = ({ user, dispatch }) => {
  const [value, setValue] = useState('');

  const handleSave = () => {
    if (!value) return;
    dispatch({ type: 'rename', payload: { id: user.id, name: value } });
    setValue('');
  };

  return (
    <div
      className={`${styles.card} ${user.active ? styles.active : styles.inactive}`}
    >
      <span
        className={`${styles.name} ${
          user.active ? styles.nameActive : styles.nameInactive
        }`}
      >
        Имя: {user.name}
      </span>

      <div className={styles.row}>
        <input
          type="text"
          placeholder="Новое имя"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button onClick={handleSave}>Сохранить</button>
      </div>

      <div className={styles.actions}>
        <button
          onClick={() =>
            dispatch({ type: 'toggleActive', payload: user.id })
          }
        >
          {user.active ? 'Сделать неактивным' : 'Сделать активным'}
        </button>
        <button
          className={styles.deleteBtn}
          onClick={() => dispatch({ type: 'remove', payload: user.id })}
        >
          Удалить
        </button>
      </div>
    </div>
  );
};
