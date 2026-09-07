// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'
import { useFetchPokemon } from './hooks/useFetchPokemon'
import { PokemonListPage} from './pages/PokemonListPage/PokemonListPage'
// import './App.css'

function App() {
  const {pokemons, count} = useFetchPokemon()
  return (
    <BrowserRouter>
      <header>
          <nav>
              <ol>
                  {pokemons.map((pokemon, index) => (
                    <div key={pokemon.name}>
                      <span> { `${index + 1} - ${pokemon.name}` } </span>
                    </div>) 
                  )}
              </ol>
          </nav>
      </header>
      {/* <Routes>
          <Route path='/' element={<PokemonListPage/>}/>
          <Route path='/about' element={<AboutPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='*' element={<NotFoundPage />} />
      </Routes> */}
    </BrowserRouter>
  )
}

export default App
