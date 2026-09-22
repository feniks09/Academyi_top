import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../api/posts';
import PostItem from './PostItem';

export default function PostsList() {
  const [showAll, setShowAll] = useState(false);

  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    return <p style={styles.status}>Загрузка постов...</p>;
  }

  if (isError) {
    return (
      <div style={styles.status}>
        <p style={{ color: 'crimson' }}>
          Произошла ошибка: {error.message}
        </p>
        <button onClick={() => refetch()} style={styles.button}>
          Попробовать снова
        </button>
      </div>
    );
  }

  const visiblePosts = showAll ? posts : posts.slice(0, 5);

  return (
    <div>
      <button onClick={() => setShowAll((prev) => !prev)} style={styles.button}>
        {showAll ? 'Показать первые 5' : 'Показать все'}
      </button>

      <ul style={styles.list}>
        {visiblePosts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
}

const styles = {
  list: { padding: 0, margin: '16px 0 0' },
  button: {
    padding: '8px 16px',
    fontSize: '14px',
    cursor: 'pointer',
    border: '1px solid #ccc',
    borderRadius: '6px',
    background: '#fff',
  },
  status: { fontSize: '15px', padding: '16px 0' },
};