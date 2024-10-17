import { Entity, PrimaryColumn, ManyToMany, JoinTable } from 'typeorm';
import { Pokemon } from './Pokemon';

@Entity()
export class Type {
  @PrimaryColumn()
  name!: string;

  @ManyToMany(() => Pokemon, (pokemon) => pokemon.types)
  @JoinTable()
  pokemons!: Pokemon[];
}
