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
    // mock axios
    // use fetchPokemons
    const formattedPokemons = await fetchPokemons(5, 2);
    console.log('formatted length', formattedPokemons.length)
    expect(formattedPokemons.length).toEqual(5);
  })
})