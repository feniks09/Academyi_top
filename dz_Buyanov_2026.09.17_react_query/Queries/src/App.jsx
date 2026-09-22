import PostsList from './components/PostsList';

export default function App() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>React Query: Загрузка постов</h1>
      <PostsList />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '720px',
    margin: '0 auto',
    padding: '24px 16px',
    fontFamily: 'system-ui, sans-serif',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '16px',
  },
};