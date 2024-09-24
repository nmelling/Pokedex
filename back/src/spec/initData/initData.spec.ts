import axios, { AxiosError } from 'axios';
import type { FetchedPokemon } from '../../types/apiResponse/pokemons';
import type { FetchedSpecies } from '../../types/apiResponse/species';
import type { ShortcutItem } from '../../types/apiResponse/common';
import type { Pokemon } from '../../types/pokemon';
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
    default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
    shiny:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png',
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
    },
  ],
};

describe('format pokemon data', () => {
  it('should format the provided data correctly', () => {
    expect(
      formatPokemonData(fetchedPokemon.pokemon, fetchedSpecies.species),
    ).toEqual(formattedBulbisaur);
  });
});

function generateMockResponses(
  resultNumber: number,
): Record<
  string,
  FetchedPokemon | FetchedSpecies | { results: ShortcutItem[] }
> {
  return {
    'https://pokeapi.co/api/v2/pokemon': {
      results: new Array(resultNumber).fill({
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1/',
      }),
    },
    'https://pokeapi.co/api/v2/pokemon/1/': fetchedPokemon.pokemon,
    'https://pokeapi.co/api/v2/pokemon-species/1/': fetchedSpecies.species,
  };
}

describe('fetch pokemons', () => {
  it('should return the <maxCount> pokemons formatted as expected', async function () {
    const mockedResponses = generateMockResponses(2);

    spyOn(axios, 'get').and.callFake(<T>(url: string): Promise<T> => {
      return Promise.resolve({ data: mockedResponses[url] } as T);
    });

    const formattedPokemons = await fetchPokemons(6, 2);
    expect(formattedPokemons.length).toEqual(6);
    expect(formattedPokemons).toEqual(new Array(6).fill(formattedBulbisaur));
    expect(axios.get).toHaveBeenCalledTimes(15);
  });

  it('Should returns the <maxCount> formatted pokemons if batch size is superior to maxCount arg', async () => {
    const mockedResponses = generateMockResponses(6);

    spyOn(axios, 'get').and.callFake(<T>(url: string): Promise<T> => {
      return Promise.resolve({ data: mockedResponses[url] } as T);
    });

    const formattedPokemons = await fetchPokemons(6, 10);
    expect(formattedPokemons.length).toEqual(6);
    expect(formattedPokemons).toEqual(new Array(6).fill(formattedBulbisaur));
    expect(axios.get).toHaveBeenCalledTimes(13);
  });

  it('should fail if pagined axios call throws', async () => {
    spyOn(axios, 'get').and.callFake(<T>(_url: string): Promise<T> => {
      const error: Partial<AxiosError> = {
        message: 'Network error',
        code: '',
        response: undefined,
      };

      return Promise.reject(error);
    });

    let formattedPokemons: Pokemon[] = [];
    try {
      formattedPokemons = await fetchPokemons(5, 2);
    } catch (err: any) {
      expect(err.message).toEqual('Network error');
    }
    expect(formattedPokemons.length).toEqual(0);
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});
