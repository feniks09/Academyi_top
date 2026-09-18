import QueryContext from './context/QueryContext';
import PostsPage from './pages/PostsPage';

export default function App() {
  return (
    <QueryContext>
      <PostsPage />
    </QueryContext>
  );
}