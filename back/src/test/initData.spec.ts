import { formatPokemonData } from '../data/initData';
import fetchedPokemon from '../ressources/fetched_pokemons.json'
import fetchedSpecies from '../ressources/fetched_species.json'

describe('format pokemon data', () => {
  it('should format the provided data correctly', () => {
    expect(formatPokemonData(fetchedPokemon.pokemon, fetchedSpecies.species)).toBe();
  })
});