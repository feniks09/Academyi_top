export default function PostItem({ post }) {
  const shortBody =
    post.body.length > 100 ? `${post.body.slice(0, 100)}...` : post.body;

  return (
    <li style={styles.item}>
      <h3 style={styles.title}>{post.title}</h3>
      <p style={styles.body}>{shortBody}</p>
    </li>
  );
}

const styles = {
  item: {
    marginBottom: '16px',
    padding: '12px 16px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    listStyle: 'none',
    background: '#fafafa',
  },
  title: {
    margin: '0 0 8px',
    fontSize: '16px',
    color: '#1a1a1a',
    textTransform: 'capitalize',
  },
  body: {
    margin: 0,
    fontSize: '14px',
    color: '#555',
    lineHeight: 1.5,
  },
};