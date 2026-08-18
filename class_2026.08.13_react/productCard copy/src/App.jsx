import { useState } from 'react'
import { ProductCard } from './components/ProductCard/ProductCard'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ProductCard/>
    </>
  )
}

export default App
