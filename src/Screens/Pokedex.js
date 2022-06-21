import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { getPokemonApi } from "../api/pokemon";
import { getPokemonDetailsByUrlApi } from "../api/pokemon";

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    (async () => {
      await loadPokemons();
    })();
  }, []);

  const loadPokemons = async () => {
    try {
      const response = await getPokemonApi();
      const pokemonsArray = await Promise.all(
        response.results.map(async (pokemon) => {
          const pokemonDetails = await getPokemonDetailsByUrlApi(pokemon.url);
          return {
            id: pokemonDetails.id,
            name: pokemonDetails.name,
            type: pokemonDetails.types[0].name,
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
      <Text>Pokedex</Text>
    </View>
  );
}
