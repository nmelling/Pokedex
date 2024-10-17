import {
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Ability } from './Ability';
import { Type } from './Type';

@Entity()
export class Stat {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  hp!: number;
  @Column()
  attack!: number;
  @Column()
  defense!: number;
  @Column()
  'special-attack'!: number;
  @Column()
  'special-defense'!: number;
  @Column()
  speed!: number;
}

@Entity()
export class Pokemon {
  @PrimaryColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToOne(() => Stat)
  @JoinColumn()
  stats!: Stat;

  @ManyToMany(() => Ability)
  @JoinTable()
  abilities!: Ability[];

  @ManyToMany(() => Type, (type) => type.pokemons)
  @JoinTable()
  types!: Type[];
}
