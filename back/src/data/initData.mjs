import axios from 'axios'
import _ from 'lodash'
import fs from 'node:fs'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

async function fetchPokemons(){
  // https://pokeapi.co/api/v2/pokemon
  let pokemons = []
  try {
    const { data: pokemonData } = await axios.get('https://pokeapi.co/api/v2/pokemon', {
      params: {
        limit: 20,
        offset: 0,
      }
    }) // get count + pagiined pokemons

    return await Promise.all(pokemonData.results.map(async ({ url }) => {
      async function axiosFetcher (url) {
        const fetch = await axios.get(url)
        return fetch.data
      }

      function formatPokemonData (pokemon, species = []) {
        const sprites = Object.fromEntries(
          Object.entries(_.pick(pokemon.sprites, ['back_default', 'back_shiny']))
          .map(([key, value]) => ([key.replace('back_', ''), value]))
        )

        return {
          name: species.names.find(entry => entry.language.name === 'fr').name,
          stats: Object.fromEntries(pokemon.stats.map(entry => [entry.stat.name, entry.base_stat])),
          sprites,
          types: pokemon.types.map(entry => entry.type.name),
          abilities: pokemon.abilities.map(entry => entry.ability),
        }
      }

      const pokemon = await axiosFetcher(url)
      const species = await axiosFetcher(pokemon.species.url)

      // add evolutions

      return formatPokemonData(pokemon, species)
    }))
  } catch (err) {
    console.error(err)
  }

  return pokemons
}

async function main() {
  const pokemons = await fetchPokemons()

  const sourceFilePath = path.join(__dirname, '../ressources/pokemons.json')
  fs.writeFileSync(sourceFilePath, JSON.stringify({ pokemons }))

  console.log('populated')
}

main()