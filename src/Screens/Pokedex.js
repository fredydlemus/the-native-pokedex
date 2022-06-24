import { View } from "react-native";
import React, { useState, useEffect } from "react";
import { getPokemonApi } from "../api/pokemon";
import { getPokemonDetailsByUrlApi } from "../api/pokemon";
import PokemonList from "../Components/PokemonList";

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);

  useEffect(() => {
    (async () => {
      await loadPokemons();
    })();
  }, []);

  const loadPokemons = async () => {
    try {
      const response = await getPokemonApi(nextUrl);
      setNextUrl(response.next);
      const pokemonsArray = await Promise.all(
        response.results.map(async (pokemon) => {
          const pokemonDetails = await getPokemonDetailsByUrlApi(pokemon.url);

          return {
            id: pokemonDetails.id,
            name: pokemonDetails.name,
            type: pokemonDetails.types[0].type.name,
            order: pokemonDetails.order,
            image:
              pokemonDetails.sprites.other["official-artwork"].front_default,
          };
        })
      );

      setPokemons([...pokemons, ...pokemonsArray]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <PokemonList
        pokemons={pokemons}
        loadPokemons={loadPokemons}
        isNext={nextUrl}
      />
    </View>
  );
}
