interface Ability {
  name: string;
  url: string;
}

export interface Pokemon {
  name: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    'special-attack': number;
    'special-defense': number;
    speed: number;
  },
  sprites: {
    default: string;
    shiny: string;
  },
  types: string[];
  abilities: Ability[];
}
