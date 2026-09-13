import { useState } from 'react'
import { Layout } from './components/Layout/Layout'
import { createContext } from 'react'

export const AutoContext = createContext(null)

function App() {
  const [name, setName] = useState('')

  const login = (newName) => {
    if (!newName.trim()) return;
    setName(newName);
  }

  const logout = () => {
    setName('')
  }

  return (
    <AutoContext.Provider value = {{name, login, logout}}>
        <Layout/>
    </AutoContext.Provider>    
  )
}

export default App
