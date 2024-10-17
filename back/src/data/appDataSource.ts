import { DataSource } from 'typeorm';
import path from 'node:path';

const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: path.join(__dirname, '../../var/pokemon.sqlite'),
  logging: false,
  entities: [path.join(__dirname, './entity/*{.ts,.js}')],
  migrations: [path.join(__dirname, './migrations/*{.ts,.js}')],
  synchronize: false,
  // subscribers: [],
});

export default AppDataSource;
