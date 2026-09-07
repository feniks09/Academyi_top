import { createContext, useContext, useEffect, useState } from "react";

const TodoContext = createContext(null);

  const [todos, setTodos] = useState([]);
  const [isCompleted, setCompleted] = useState(true);
  const [isLoading, setIsLoading] = useState()

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => {
        const loadTodos = data.map((todo) => ({
          ...todo,
        }));
        setTodos(loadTodos);
      })
      .finally(() => setIsLoading(false));
  }, [todo]);

  return (
    <TodoContext.Provider value={{ todo, isCompleted }}>
      {children}
    </TodoContext.Provider>
  );


export function useTodos() {
  const context = useContext(TodoContext);
  return context;}
