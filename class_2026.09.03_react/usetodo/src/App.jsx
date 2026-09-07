import { useState } from 'react'
import { memo } from 'react'

const CounterDisplay = memo(({ count }) => {

  console.log('Render CounterDisplay')
  return <div>Счетчик: {count}</div>
})

function App() {
  
  const [count, setCount] = useState(0)  
  const [text, setText] = useState('')   

  const handleIncrement = () => {
    setCount(prev => prev + 1)
  }

  const handleTextChange = (e) => {
    setText(e.target.value)
  }

  return (
    <div>
      <CounterDisplay count={count} />
      <button onClick={handleIncrement}>
        Увеличить счётчик
      </button>
      
      <input
        type="text"
        value={text}
        onChange={handleTextChange}
        placeholder="Введите текст"
      />
      <div>{text}</div>
    </div>
  )
}

export default App