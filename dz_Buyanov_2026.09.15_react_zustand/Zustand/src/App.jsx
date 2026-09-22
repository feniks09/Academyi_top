import TodoForm from "./components/TodoForm/TodoForm";
import TodoList from "./components/TodoList/TodoList";


export default function App() {
  return (
    <div style={{ maxWidth: 480, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>Zustand: Список задач</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
}