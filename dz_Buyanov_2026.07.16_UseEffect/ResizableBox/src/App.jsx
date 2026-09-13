import { useState } from 'react'
import { useEffect } from 'react'
import { useLayoutEffect } from 'react'
import { useRef } from 'react'

import './App.css'

function App() {

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const ref = useRef(null)

  useLayoutEffect(() => {
    const handleResize = () => {
      if (ref.current) { 
      const rect = ref.current.getBoundingClientRect();
      console.log(rect)
      setWidth(Math.floor(rect.width));
      setHeight(Math.floor(rect.height));
      console.log('внутри handler', width, height)
      }
    }
    console.log('внутри effect', width, height)
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize)

  }, []);

  return (
    <div ref={ref} style={{
      width : 'auto',
      height : '100vh',
      backgroundColor : 'red',
      border : '1px black solid',
      boxSizing : 'border-box',
      resize : 'both',
      overflow : 'auto'
    }}>
      <span style={{
        display : 'block',
        color : 'black'
      }}>Ширина: { width }, Высота { height }</span>
    </div>
  )
}

export default App
