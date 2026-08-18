import { useState } from 'react'
import './App.css'
import { ThemeToggle } from "./components/ThemeToggler.jsx"
import { useEffect } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const [theme, setTheme] = useState('light')
  const clickHandler = () => {
   if (theme = 'light'){
    setTheme(dark)
   }
  }
  return (
    <>
    <ThemeToggle onClick={setTheme}></ThemeToggle>
    </>
  )
}

export default App
