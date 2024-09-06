import { formatPokemonData } from '../../src/data/initData';
import fetchedPokemon from '../../src/ressources/fetched_pokemons.json';
import fetchedSpecies from '../../src/ressources/fetched_species.json';

describe('format pokemon data', () => {
  it('should format the provided data correctly', () => {
    expect(formatPokemonData(fetchedPokemon.pokemon, fetchedSpecies.species))
    .toEqual({
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
    });
  })
});