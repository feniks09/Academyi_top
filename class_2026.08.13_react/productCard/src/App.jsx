import { useState } from 'react'
import { ProductCard } from './components'
import { ListUsers } from './components'
import { Text } from './components'
import './App.css'

function App() {

  return (
    <>
    <ProductCard/>
    <ListUsers className='yellow'>эй давай веселей</ListUsers>
    <div className='green'>{"Привет мир"}</div>
    <Text/>
    </>
  )
}

export default App
