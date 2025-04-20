"use client";

import { FC } from "react";
import { Pokemon } from "@/features/pokemon/types";
import PokemonCard from "./PokemonCard";

interface PokemonListProps {
  pokemons: Pokemon[];
}

const PokemonList: FC<PokemonListProps> = ({ pokemons }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-4 ">
      {pokemons.map((pokemon, index) => (
        <PokemonCard key={pokemon.name} index={index} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonList;
