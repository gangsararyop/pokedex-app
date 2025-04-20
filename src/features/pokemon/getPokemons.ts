import { PokemonClient } from "pokenode-ts";

const api = new PokemonClient();

const getPokemons = async ({
  limit = 10,
  offset = 0,
}: {
  limit: number;
  offset: number;
}) => {
  // Fetching a list of Pokémon names based on offset and limit
  const resPoke = await api.listPokemons(offset, limit);

  const pokes = resPoke.results;

  // Async function to get a list of Pokémon with detailed data
  const pokeDetailPromises = pokes.map(async (pokemon) => {
    // Fetch detailed information for each Pokémon by name
    const resPokeDetail = await api.getPokemonByName(pokemon.name);

    // Fetch types of the Pokémon (each type needs to be fetched individually)
    const pokeTypesPromises = resPokeDetail.types.map(({ type }) =>
      api.getTypeByName(type.name)
    );

    // Fetch base stats of the Pokémon along with detailed stat info
    const pokeStatsPromises = resPokeDetail.stats.map(
      async ({ base_stat, stat }) => {
        const resStat = await api.getStatByName(stat.name);

        return { baseStat: base_stat, stat: resStat };
      }
    );

    const resPokeTypes = await Promise.all(pokeTypesPromises);
    const resPokeStats = await Promise.all(pokeStatsPromises);

    // Fetch species-related information for the Pokémon
    const resPokeSpecies = await api.getPokemonSpeciesByName(pokemon.name);

    // Format types into an array of type names
    const formattedTypes = resPokeTypes.map((type) => type.name);

    return {
      name: pokemon.name,
      stats: resPokeStats,
      image: resPokeDetail.sprites.other?.dream_world.front_default,
      types: formattedTypes,
      color: resPokeSpecies.color.name,
      height: resPokeDetail.height,
      weight: resPokeDetail.weight,
      species: resPokeSpecies.genera,
      abilities: resPokeDetail.abilities,
      eggGroups: resPokeSpecies.egg_groups,
      genderRate: resPokeSpecies.gender_rate,
      hatchCounter: resPokeSpecies.hatch_counter,
    };
  });

  const resPokeDetails = await Promise.all(pokeDetailPromises);

  return resPokeDetails;
};

export default getPokemons;
