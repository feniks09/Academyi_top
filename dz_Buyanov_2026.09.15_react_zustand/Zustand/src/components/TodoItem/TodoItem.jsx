import { useTodoStore } from "../../store/todoStore";


export default function TodoItem({ todo }) {
  const toggleTodo = useTodoStore((state) => state.toggleTodo)
  const removeTodo = useTodoStore((state) => state.removeTodo);

  return (
    <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <span
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          flex: 1,
        }}
      >
        {todo.text}
      </span>
      <button onClick={() => removeTodo(todo.id)}>Удалить</button>
    </li>
  );
}