import axios, { AxiosResponse } from 'axios';

import type { Pokemon } from '../types/pokemon.js';
import type { ShortcutItem } from '../types/apiResponse/common.js';
import type { FetchedPokemon } from '../types/apiResponse/pokemons.js';
import type { FetchedSpecies } from '../types/apiResponse/species.js';

export function formatPokemonData(
  pokemon: FetchedPokemon,
  specie: FetchedSpecies,
): Pokemon {
  return {
    name:
      specie.names.find((entry) => entry.language.name === 'fr')?.name ?? '',
    stats: Object.fromEntries(
      pokemon.stats.map((entry) => [entry.stat.name, entry.base_stat]),
    ),
    sprites: {
      default: pokemon.sprites.back_default ?? null,
      shiny: pokemon.sprites.back_shiny ?? null,
    },
    types: pokemon.types.map((entry) => entry.type.name),
    abilities: pokemon.abilities.map((entry) => entry.ability),
  };
}

export async function fetchPokemons(
  maxCount: number,
  $batchSize: number,
): Promise<Pokemon[]> {
  const pokemons: Pokemon[] = [];

  let rounded = 1;
  const batchSize = Math.min($batchSize, maxCount);
  if (batchSize < maxCount) rounded = Math.round(maxCount / batchSize);

  const batched = new Array(rounded).fill(null).map((_entry, index) => {
    const formatted = {
      limit: batchSize,
      offset: index + index,
    };
    if (index === rounded - 1) formatted.limit = maxCount - index * batchSize;
    return formatted;
  });

  for (const { limit, offset } of batched) {
    try {
      const response: AxiosResponse<{ results: ShortcutItem[] }> =
        await axios.get('https://pokeapi.co/api/v2/pokemon', {
          params: {
            limit,
            offset,
          },
        });

      const formattedPokemons = await Promise.all(
        response.data.results.map(
          async (entry: ShortcutItem): Promise<Pokemon> => {
            const { data: pokemon }: AxiosResponse<FetchedPokemon> =
              await axios.get(entry.url);
            const { data: species }: AxiosResponse<FetchedSpecies> =
              await axios.get(pokemon.species.url);

            return formatPokemonData(pokemon, species);
          },
        ),
      );

      pokemons.push(...formattedPokemons);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  return pokemons;
}

// Later, will need to fetch type weaknesses
