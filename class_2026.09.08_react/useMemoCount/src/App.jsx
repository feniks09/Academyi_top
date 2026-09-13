import React, { useState, useCallback } from "react";
import { useMemo } from "react";
import Button from "./components/Button/Button";

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  console.log("App render");

  const handleIncrement = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const Calculation = useMemo(() => {
    console.log("Вычисление...");
    return count * 2;
  }, [count]);

  return (
    <div>
      <h2>Counter - {count}</h2>
      <p>Удвоенный счётчик: {Calculation}</p>
      
      <Button onClick={handleIncrement} text="Увеличить" />

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите текст"
      />
      <p>Текст: {text}</p>
    </div>
  );
}

export default App;