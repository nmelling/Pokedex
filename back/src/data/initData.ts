import axios, { AxiosResponse } from 'axios';
import _ from 'lodash';
import path from 'node:path';
import fs from 'node:fs';

import type { Pokemon } from '../types/pokemon.d.ts';
import type { ShortcutItem } from '../types/apiResponse/common.d.ts';
import type { FetchedPokemon } from '../types/apiResponse/pokemons.d.ts'
import type { FetchedSpecies } from '../types/apiResponse/species.d.ts'
 

export function formatPokemonData(pokemon: FetchedPokemon, specie: FetchedSpecies): Pokemon {
  return {
    name: (specie.names! ?? []).find(entry => entry.language.name === 'fr')?.name || '',
    stats: Object.fromEntries(pokemon.stats.map(entry => [entry.stat.name, entry.base_stat])),
    sprites: {
      default: pokemon.sprites.back_default ?? null,
      shiny: pokemon.sprites.back_shiny ?? null,
    },
    types: pokemon.types.map(entry => entry.type.name),
    abilities: pokemon.abilities.map(entry => entry.ability),
  }
}

export async function fetchPokemons(maxCount: number, batchSize: number): Promise<Pokemon[]> {

  const pokemons: Pokemon[] = [];

  // add some verification to handle maxCount inferior to batchSize
  const rounded = Math.round(maxCount / batchSize) // arrondi supérieur

  const batched = new Array(rounded)
  .fill(null)
  .map((_entry, index) => {
    const formatted = {
      limit: batchSize,
      offset: index + index,
    };
    if (index === rounded - 1) formatted.limit = maxCount - (index * batchSize);
    return formatted;
  })

  for (const { limit, offset } of batched) {
    try {
      const response: AxiosResponse = await axios.get('https://pokeapi.co/api/v2/pokemon', {
        params: {
          limit,
          offset,
        }
      });
  
      const formattedPokemons: Pokemon[] = await Promise.all((response.data.results ?? []).map(async (entry: ShortcutItem) => {
        const { data: pokemon }: AxiosResponse  = await axios.get(entry.url);
        const { data: species }: AxiosResponse = await axios.get(pokemon.species.url);
  
        return formatPokemonData(pokemon, species);
      }))

      pokemons.push(...formattedPokemons);
    } catch (err) {
      console.error(err);
      throw err;
    }

  }
  
  return pokemons;
}

export async function main(): Promise<void> {
  const pokemons = await fetchPokemons(5, 2)

  const sourceFolderPath = path.join(__dirname, '../ressources')
  const sourceFilePath = path.join(sourceFolderPath, 'pokemons.json')
  if (!fs.existsSync(sourceFolderPath)) {
    fs.mkdirSync(sourceFolderPath)
  }
  fs.writeFileSync(sourceFilePath, JSON.stringify({ pokemons }))

  console.log('populated')
}

main()
