
import { useState, useEffect } from "react";
import { PokemonPage } from "../PokemonPage/PokemonPage"

export const PokemonListPage = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);

  const fetchPokemons = async (url = "https://pokeapi.co/api/v2/pokemon?limit=20") => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch pokemons");
      }
      const data = await response.json();
      setPokemons(data.results);
      setNextUrl(data.next);
      setPrevUrl(data.previous);
    } catch (err) {
      setError(err.message);
      setPokemons([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2>Loading Pokemons...</h2>
        <div style={{ fontSize: "40px" }}>⚡</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2 style={{ color: "red" }}>Error: {error}</h2>
        <button onClick={() => fetchPokemons()}>Try Again</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <Title text="Pokemon List" />
      
      <ul style={{ padding: 0 }}>
        {pokemons.map((pokemon) => (
          <PokemonItem key={pokemon.name} pokemon={pokemon} />
        ))}
      </ul>

      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        marginTop: "20px",
        gap: "10px"
      }}>
        <button
          onClick={() => fetchPokemons(prevUrl)}
          disabled={!prevUrl}
          style={{
            padding: "10px 20px",
            backgroundColor: prevUrl ? "#4CAF50" : "#ccc",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: prevUrl ? "pointer" : "not-allowed",
            flex: 1
          }}
        >
          ← Previous
        </button>
        
        <button
          onClick={() => fetchPokemons(nextUrl)}
          disabled={!nextUrl}
          style={{
            padding: "10px 20px",
            backgroundColor: nextUrl ? "#4CAF50" : "#ccc",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: nextUrl ? "pointer" : "not-allowed",
            flex: 1
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
};