import { useEffect, useState } from "react";

export const useFetchPokemon = () => {
    const [pokemons, setPokemons] = useState([]);
    const [count, setCount] = useState(0);
    const [pagination, setPagination] = useState('')

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon')
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            setPokemons(data.results);
            setCount(data.count);
            setPagination(data.next);
        });
    }, []);
    const handleMore = () => {
        fetch(pagination)
        .then((res) => res.json())
        .then((data) => {
            setPokemons([...pokemons, ...data.results]);
            setPagination(data.next);
            setCount(data.count)
        });
    };
    return {
        count,
        pokemons,
        handleMore,
    };
}