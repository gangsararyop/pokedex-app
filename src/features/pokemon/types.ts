import { Genus, NamedAPIResource, PokemonAbility, Stat } from "pokenode-ts";

export interface Pokemon {
  name: string;
  stats: PokemonStat[];
  color: string;
  types: string[];
  image?: string | null | undefined;
  height: number;
  weight: number;
  species: Genus[];
  abilities: PokemonAbility[];
  eggGroups: NamedAPIResource[];
  genderRate: number;
  hatchCounter: number;
}

export interface PokemonStat {
  baseStat: number;
  stat: Stat;
}
