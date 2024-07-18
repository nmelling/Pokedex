import axios, { AxiosResponse } from 'axios';
import _ from 'lodash';
import path from 'node:path';

import { Pokemon } from '../types/pokemon';
import { FetchedPokemon } from '../types/apiResponse/pokemons'
import { FetchedSpecies } from '../types/apiResponse/species'
 

function formatPokemonData(pokemon: FetchedPokemon, specie: FetchedSpecies): Pokemon {
  const sprites = Object.fromEntries(
    Object.entries(_.pick(pokemon.sprites, ['back_default', 'back_shiny']))
    .map(([key, value]) => ([key.replace('back_', ''), value]))
  )

  return {
    name: (specie.names || []).find(entry => entry.language.name === 'fr').name,
    stats: Object.fromEntries(pokemon.stats.map(entry => [entry.stat.name, entry.base_stat])),
    sprites,
    types: pokemon.types.map(entry => entry.type.name),
    abilities: pokemon.abilities.map(entry => entry.ability),
  }
}

async function fetchPokemons(): Promise<Pokemon[]> {
  let pokemons: Pokemon[] = []

  try {
    const response: AxiosResponse<object> = await axios.get('https://pokeapi.co/api/v2/pokemon', {
      params: {
        limit: 20,
        offset: 0,
      }
    });
  } catch (err) {
    console.error(err);
    throw err;
  }

  return pokemons;
}
