import 'reflect-metadata';
import path from 'node:path';
import { DataSource } from 'typeorm';
import { Command } from 'commander';

import { version } from '../../package.json';
import { fetchPokemons } from '../data/fetchAndFormatData';

const program = new Command();

program
  .name('db_initializer')
  .description('CLI to create & populate the database')
  .version(version);

program
  .command('init_database')
  .description('Check if database exists & run the migrations')
  .action(async () => {
    const AppDataSource = new DataSource({
      type: 'better-sqlite3',
      database: path.join(__dirname, '../../var/pokemon.sqlite'),
      synchronize: true,
      logging: false,
      entities: [__dirname + '../data/entity/*.ts'],
      // migrations: [],
      // subscribers: [],
    });

    try {
      await AppDataSource.initialize();
    } catch (err) {
      if (err instanceof Error)
        console.error(`Initialization database error : ${err.message}`);
    }
  });

program
  .command('populate_pokemons')
  .description('Fetch pokemons data from pokeAPI & store it into database')
  .argument(
    '<maxCount>',
    'The number of pokemons you want into your database (starting at Bulbizarre)',
  )
  .argument(
    '<batchSize>',
    'The batch size to split max count into fetching groups',
  )
  .action(async (maxCount: number, batchSize: number) => {
    if (!maxCount) throw new Error('maxCount is required & should be a number');

    const pokemons = await fetchPokemons(Number(maxCount), Number(batchSize));

    console.log({ pokemons });
    // Now, should store pokemons into DB
  });

program.parse(process.argv);
