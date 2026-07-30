import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

export const App = () =>{
  const [count, setCount] = useState(0)
  console.log(count)
  useEffect(() => {
    const interval =
      setTimeout( setCount(prev => count + 1), 1000 )
    console.log(count)
  }, [])
  const handlerClick = () => {
    setCount((prev) => {
      const newCount = 
        prev + 1;
      return newCount
    })
  }
    console.log(count)
  
  return (
    <>
    <div>это мое приложение значением { count }</div>
    <button onClick = {handlerClick}>click</button>
    </>
  )}






