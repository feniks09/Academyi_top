import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setCompleted] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTodos(data);
      })
      .catch()
      .finally(() => {
        setCompleted(false);
      });
  }, []);


  return (
    <>
      <h1>Pokemon page - {name}</h1>
      <img src={pokemon.sprites.front_default} height={150} width={150} />
    </>
  );
};