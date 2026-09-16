import React, { useState, useEffect } from 'react';

const DataFetcher = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      console.log('Монтирование компонента');
    } else {
      console.log('Обновление компонента');
    }

    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
        );

        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const data = await response.json();

        setPosts(data.slice(0, 5));
        
      } catch (err) {

          setError(err.message);

      } finally {

          setLoading(false);
      }
    };

    fetchPosts();

    return () => {
      console.log('Размонтирование компонента');
    };
  }, [userId]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p style={{ color: 'red' }}>Ошибка: {error}</p>;

  return (
    <div style={{ marginTop: '16px' }}>
      <h3>Посты пользователя #{userId}</h3>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default DataFetcher;