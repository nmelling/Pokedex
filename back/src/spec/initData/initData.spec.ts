import axios from 'axios'
import type { FetchedPokemon } from '../../types/apiResponse/pokemons'
import type { FetchedSpecies } from '../../types/apiResponse/species'
import type { ShortcutItem } from '../../types/apiResponse/common'
import { formatPokemonData, fetchPokemons } from '../../data/initData';
import fetchedPokemon from '../../ressources/fetched_pokemons.json';
import fetchedSpecies from '../../ressources/fetched_species.json';

const formattedBulbisaur = {
  name: 'Bulbizarre',
  stats: {
    hp: 45,
    attack: 49,
    defense: 49,
    'special-attack': 65,
    'special-defense': 65,
    speed: 45,
  },
  sprites: {
    default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
    shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png',
  },
  types: ['grass', 'poison'],
  abilities: [
    {
      name: 'overgrow',
      url: 'https://pokeapi.co/api/v2/ability/65/',
    },
    {
      name: 'chlorophyll',
      url: 'https://pokeapi.co/api/v2/ability/34/',
    }
  ],
}

describe('format pokemon data', () => {
  it('should format the provided data correctly', () => {
    expect(formatPokemonData(fetchedPokemon.pokemon, fetchedSpecies.species))
    .toEqual(formattedBulbisaur);
  })

  it('should fail if the fetched pokemon is not formatted as expected', () => {
    //
  })

  it('should fail if the fetched specie is not formatted as expected', () => {
    //
  })

  it('should fail if some fetched entry is not provided', () => {
    //
  })
  
});

describe('fetch pokemons', () => {
  it('should return 5 pokemons formatted as expected', async function() {
    spyOn(axios, 'get').and.callFake(<T>(url: string): Promise<T> => {
      const mockedResponses: { [key: string]: FetchedPokemon | FetchedSpecies | { results: ShortcutItem[] } } = {
        'https://pokeapi.co/api/v2/pokemon': {
          results: new Array(2).fill({ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }),
        },
        'https://pokeapi.co/api/v2/pokemon/1/': fetchedPokemon.pokemon,
        'https://pokeapi.co/api/v2/pokemon-species/1/': fetchedSpecies.species,
      }

      return Promise.resolve({ data: mockedResponses[url] } as T);
    })

    const formattedPokemons = await fetchPokemons(6, 2);
    expect(formattedPokemons.length).toEqual(6);
    expect(formattedPokemons).toEqual(new Array(6).fill(formattedBulbisaur))
    expect(axios.get).toHaveBeenCalledTimes(15);
  })

  it('Should returns the maxCount formatted pokemons if batch size is superior to maxCount arg', () => {
    //
  })

  it('should fail if pagined axios call throws', () => {
    //
  })
})