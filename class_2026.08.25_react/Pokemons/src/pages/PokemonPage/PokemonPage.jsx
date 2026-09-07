import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const PokemonPage = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPokemon(data);
      })
      .catch()
      .finally(() => {
        setLoading(false);
      });
  }, [name]);

  if (loading) return <h2>LOADING...</h2>;
  if (!pokemon) return <h2>This pokemin is not valid</h2>;

  return (
    <>
      <h1>Pokemon page - {name}</h1>
      <img src={pokemon.sprites.front_default} height={150} width={150} />
    </>
  );
};