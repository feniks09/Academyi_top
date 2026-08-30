import { useState } from 'react'
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useFetchPokemon } from './hooks/useFetchPokemon'
import { PokemonListPage} from './pages/PokemonListPage'
// import './App.css'

function App() {
  return (
    <BrowserRouter>
      <header>
          <nav>
              <ul>
                  <li></li>
              </ul>
          </nav>
      </header>
      <Routes>
          <Route path='/' element={<PokemonListPage/>}/>
          <Route path='/about' element={<AboutPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
