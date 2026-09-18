import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../api/posts';

export default function PostsList() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  if (isLoading) {
    return <p>Загрузка пользователей...</p>;
  }

  if (isError) {
    return <p>Ошибка при загрузке: {error.message}</p>;
  }

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>
          <strong>{user.name}</strong> — {user.email}
        </li>
      ))}
    </ul>
  );
}