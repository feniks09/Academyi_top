import { useReducer } from 'react';
import styles from './UsersList.module.css';
import { UserItem } from '../UserItem/UserItem';


const UsersData = [
  { id: 1, name: 'Иван', active: true },
  { id: 2, name: 'Мария', active: false },
  { id: 3, name: 'Алексей', active: true },
];

function reducer(state, action) {
  switch (action.type) {
    case 'rename':
      return state.map(user =>
        user.id === action.payload.id
          ? { ...user, name: action.payload.name }
          : user
      );
    case 'remove':
      return state.filter(user => user.id !== action.payload);
    case 'toggleActive':
      return state.map(user =>
        user.id === action.payload
          ? { ...user, active: !user.active }
          : user
      );
    default:
      return state;
  }
}

export const UsersList = () => {
  const [users, dispatch] = useReducer(reducer, UsersData);

  return (
    <div className={styles.list}>
      <h2 className={styles.title}>Список пользователей (useReducer)</h2>

      {users.map(user => (
        <UserItem key={user.id} user={user} dispatch={dispatch} />
      ))}
    </div>
  );
};