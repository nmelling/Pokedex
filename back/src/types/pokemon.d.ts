interface Ability {
  name: string;
  url: string;
}

export interface Pokemon {
  name: string;
  stats: { [key: string]: number };
  sprites: { [key: string]: string | null };
  types: string[];
  abilities: Ability[];
}
