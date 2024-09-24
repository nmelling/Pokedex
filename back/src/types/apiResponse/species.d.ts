import { ShortcutItem } from './common';

interface Flavor {
  flavor_text: string;
  language: ShortcutItem;
  version: ShortcutItem;
}

interface Genera {
  genus: string;
  language: ShortcutItem;
}

interface Name {
  language: ShortcutItem;
  name: string;
}

interface PalParkEncounter {
  area: ShortcutItem;
  base_score: number;
  rate: number;
}

interface PokedexNumber {
  entry_number: number;
  pokedex: ShortcutItem;
}

interface Variety {
  is_default: boolean;
  pokemon: ShortcutItem;
}

export interface FetchedSpecies {
  base_happiness: number;
  capture_rate: number;
  color: ShortcutItem;
  egg_groups: ShortcutItem[];
  evolution_chain: {
    url: string;
  };
  evolves_from_species: null;
  flavor_text_entries: Flavor[];
  form_descriptions: ShortcutItem[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: Genera[];
  generation: ShortcutItem;
  growth_rate: ShortcutItem;
  habitat: ShortcutItem;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: Name[];
  order: number;
  pal_park_encounters: PalParkEncounter[];
  pokedex_numbers: PokedexNumber[];
  shape: ShortcutItem;
  varieties: Variety[];
}
