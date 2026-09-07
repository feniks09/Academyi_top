import { useState, useMemo } from "react";

const slowFunction = (num) => {
    console.log("slowFunction вызвана");
    let result = 0;
    for (let i = 0; i < 100000000; i++) {
      result += i;
    }
    return num * 2;
  };

function App() {
  const [count, setCount] = useState(1);
  const [text, setText] = useState("");

  const computedValue = useMemo(() => slowFunction(count), [count]);

  return (
    <div>
      <h1>useMemo</h1>
      <h2>Вычисленное : {computedValue}</h2>
      
      <button onClick={() => setCount((prev) => prev + 1)}>
        Увеличить
      </button>
      <span>{count}</span>
      
      <div>
        <input
          type="text"
          placeholder="Введите текст..."
          value={""}
          onChange={(e) => setText(e.target.value)}
        />
        <span>Введено: {text}</span>
      </div>
    </div>
  );
}

export default App;