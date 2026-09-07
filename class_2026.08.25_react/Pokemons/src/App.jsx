// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'
import { useFetchPokemon } from './hooks/useFetchPokemon'
import { PokemonListPage} from './pages/PokemonListPage/PokemonListPage'
// import './App.css'

function App() {
  const {pokemons, count} = useFetchPokemon()
  return (
  <> 
  <h2>Pokemon list - {count}</h2>
    {pokemons.map((pokemon, index) => (
                    <div key={pokemon.name}>
                      <span> { `${index + 1} - ${pokemon.name}` } </span>
                    </div>) 
                  )}
  </>
  )
}

export default App
