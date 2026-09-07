import { useState } from 'react'
import { useMemo } from 'react'

// import './App.css'
const SlowFanction = (num) => {
    
    let result = 0;
    for (let i = 0; i < 1_000_000; i++){
      result += i;
    }
    return (num * 2)
  }; 

function App() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')

  const memoFank = useMemo(() => SlowFanction(count), [count])
  return (
   <div>
      <input 
        type="text"
        placeholder="Введите текст..."
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <h2>{text}</h2>
      <h2>Счетчик</h2>
      <button onClick={() => setCount(prev => prev + 1)}>Увеличить</button>
      <span>{count}</span>
      <h2>Результат вычисления</h2>
      <span>{memoFank}</span>

   </div>
  )
}

export default App
