import { useCounterStore } from "./store/store";


function CounterValue() {
  const count = useCounterStore((state) => state.count);
  return <h1>{count}</h1>;
}

function CounterButtons() {
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  const reset = useCounterStore((state) => state.reset);

  return (
    <div>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>reset</button>
    </div>
  );
}

function App() {
  return (
    <div>
      <CounterValue />
      <CounterButtons />
    </div>
  );
}

export default App;