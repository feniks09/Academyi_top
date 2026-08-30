import { useState } from 'react'
import { ProductCard } from './components'
import { ListUsers } from './components'
import { Text } from './components'
import './App.css'

function App() {

  return (
    <>
    <ProductCard className='card' 
                 name='Bodegas Piqueras Castillo' 
                 discript='Тип: красное, сухое.
                           Описание: у этого вина яркий и сложный букет. В аромате чувствуются пряности, чернослив, слива и жареный болгарский перец. Вкус элегантный и насыщенный, с долгим и шелковистым послевкусием.' 
                 count= {0} />
                 
    </>
  )
}

export default App
