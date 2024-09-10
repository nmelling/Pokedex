import axios from 'axios'
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
});

describe('fetch pokemons', () => {
  it('should return X pokemons formatted as expected', async function() {
    spyOn(axios, 'get').and.callFake((url: string) => {
      // moduler le nombre de resultats initiaux en fonction du batcSize passé
      // (tjr reprendre bulbizarre pour les tests)
      const mockedResponses = {
        'https://pokeapi.co/api/v2/pokemon': {
          data: {
            results: [
              { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }
            ],
          },
        },
        'https://pokeapi.co/api/v2/pokemon/1/': {
          data: fetchedPokemon.pokemon,
        },
        'https://pokeapi.co/api/v2/pokemon-species/1/': {
          data: fetchedSpecies.species,
        },
      }
    })
    // mock axios
    const formattedPokemons = await fetchPokemons(5, 2);
    expect(formattedPokemons.length).toEqual(5);
  })

  it('should mock axios', async () => {
    const mockResponse = { data : { message: 'Hello World'} }
    spyOn(axios, 'get').and.returnValue(Promise.resolve(mockResponse))

    const test = async () => {
      return await axios.get('blabla')
    }

    const result = await test()

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(result.data).toEqual({ message: 'Hello World'});
  })
})