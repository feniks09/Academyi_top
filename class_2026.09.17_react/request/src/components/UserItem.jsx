export default function PostItem({ user }) {
  return (
    <li>
      <strong>{user.name}</strong> — {user.email}
    </li>
  );
}