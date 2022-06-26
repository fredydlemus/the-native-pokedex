import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PokemonScreen from "../Screens/Pokemon";
import PokedexScreen from "../Screens/Pokedex";

const Stack = createNativeStackNavigator();

export default function PokedexNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Pokedex"
        component={PokedexScreen}
        options={{
          title: "",
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Pokemon"
        component={PokemonScreen}
        options={{ title: null, headerTransparent: true }}
      />
    </Stack.Navigator>
  );
}
