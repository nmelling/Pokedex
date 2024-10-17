import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Ability {
  @PrimaryColumn()
  name!: string;

  @Column()
  url!: string;
}
