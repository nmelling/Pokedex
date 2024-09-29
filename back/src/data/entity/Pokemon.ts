import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Pokemon {
  @PrimaryColumn()
  id!: number;

  @Column()
  name!: string;
}

@Entity()
export class Stat {
  @PrimaryColumn()
  pokemonId!: number;
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
