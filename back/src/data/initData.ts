import axios, { AxiosResponse } from 'axios';
import _ from 'lodash';
import path from 'node:path';
import fs from 'node:fs';

import type { Pokemon } from '../types/pokemon.d.ts';
import type { ShortcutItem } from '../types/apiResponse/common.d.ts';
import type { FetchedPokemon } from '../types/apiResponse/pokemons.d.ts'
import type { FetchedSpecies } from '../types/apiResponse/species.d.ts'
 

function formatPokemonData(pokemon: FetchedPokemon, specie: FetchedSpecies): Pokemon {
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

async function axiosFetcher (url: string) {
  try {
    const response: AxiosResponse = await axios.get(url);
    return response.data
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function fetchPokemons(): Promise<Pokemon[]> {
  try {
    const response: AxiosResponse = await axios.get('https://pokeapi.co/api/v2/pokemon', {
      params: {
        limit: 20,
        offset: 0,
      }
    });

    return await Promise.all((response.data.results ?? []).map(async (entry: ShortcutItem) => {
      const pokemon: FetchedPokemon = await axiosFetcher(entry.url)
      const species: FetchedSpecies = await axiosFetcher(pokemon.species.url)

      return formatPokemonData(pokemon, species)
    }))
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function main(): Promise<void> {
  const pokemons = await fetchPokemons()

  const sourceFilePath = path.join(__dirname, '../ressources/pokemons.json')
  fs.writeFileSync(sourceFilePath, JSON.stringify({ pokemons }))

  console.log('populated')
}

main()
