interface Ability {
  name: string;
  url: string;
}

export interface Pokemon {
  name: string;
  stats: Record<string, number>;
  sprites: Record<string, string | null>;
  types: string[];
  abilities: Ability[];
}
