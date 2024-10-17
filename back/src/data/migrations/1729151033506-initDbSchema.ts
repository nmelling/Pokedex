import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDbSchema1729151033506 implements MigrationInterface {
    name = 'InitDbSchema1729151033506'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ability" ("name" varchar PRIMARY KEY NOT NULL, "url" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "stat" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "hp" integer NOT NULL, "attack" integer NOT NULL, "defense" integer NOT NULL, "special-attack" integer NOT NULL, "special-defense" integer NOT NULL, "speed" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "pokemon" ("id" integer PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "statsId" integer, CONSTRAINT "REL_e46d42c1bd36941969dcc06a01" UNIQUE ("statsId"))`);
        await queryRunner.query(`CREATE TABLE "type" ("name" varchar PRIMARY KEY NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "pokemon_abilities_ability" ("pokemonId" integer NOT NULL, "abilityName" varchar NOT NULL, PRIMARY KEY ("pokemonId", "abilityName"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cb6559d85c42dbe749ce654d81" ON "pokemon_abilities_ability" ("pokemonId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2dc0964f2f6e725d67f638d7e8" ON "pokemon_abilities_ability" ("abilityName") `);
        await queryRunner.query(`CREATE TABLE "pokemon_types_type" ("pokemonId" integer NOT NULL, "typeName" varchar NOT NULL, PRIMARY KEY ("pokemonId", "typeName"))`);
        await queryRunner.query(`CREATE INDEX "IDX_788d754ccb53a6313e2e5728ac" ON "pokemon_types_type" ("pokemonId") `);
        await queryRunner.query(`CREATE INDEX "IDX_02f5ec893d362fa2a62cac6ad3" ON "pokemon_types_type" ("typeName") `);
        await queryRunner.query(`CREATE TABLE "type_pokemons_pokemon" ("typeName" varchar NOT NULL, "pokemonId" integer NOT NULL, PRIMARY KEY ("typeName", "pokemonId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a419a96ad1ebf84d2e710f04a4" ON "type_pokemons_pokemon" ("typeName") `);
        await queryRunner.query(`CREATE INDEX "IDX_97419c45d60270d1363a7717ac" ON "type_pokemons_pokemon" ("pokemonId") `);
        await queryRunner.query(`CREATE TABLE "temporary_pokemon" ("id" integer PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "statsId" integer, CONSTRAINT "REL_e46d42c1bd36941969dcc06a01" UNIQUE ("statsId"), CONSTRAINT "FK_e46d42c1bd36941969dcc06a01c" FOREIGN KEY ("statsId") REFERENCES "stat" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_pokemon"("id", "name", "statsId") SELECT "id", "name", "statsId" FROM "pokemon"`);
        await queryRunner.query(`DROP TABLE "pokemon"`);
        await queryRunner.query(`ALTER TABLE "temporary_pokemon" RENAME TO "pokemon"`);
        await queryRunner.query(`DROP INDEX "IDX_cb6559d85c42dbe749ce654d81"`);
        await queryRunner.query(`DROP INDEX "IDX_2dc0964f2f6e725d67f638d7e8"`);
        await queryRunner.query(`CREATE TABLE "temporary_pokemon_abilities_ability" ("pokemonId" integer NOT NULL, "abilityName" varchar NOT NULL, CONSTRAINT "FK_cb6559d85c42dbe749ce654d810" FOREIGN KEY ("pokemonId") REFERENCES "pokemon" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_2dc0964f2f6e725d67f638d7e85" FOREIGN KEY ("abilityName") REFERENCES "ability" ("name") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("pokemonId", "abilityName"))`);
        await queryRunner.query(`INSERT INTO "temporary_pokemon_abilities_ability"("pokemonId", "abilityName") SELECT "pokemonId", "abilityName" FROM "pokemon_abilities_ability"`);
        await queryRunner.query(`DROP TABLE "pokemon_abilities_ability"`);
        await queryRunner.query(`ALTER TABLE "temporary_pokemon_abilities_ability" RENAME TO "pokemon_abilities_ability"`);
        await queryRunner.query(`CREATE INDEX "IDX_cb6559d85c42dbe749ce654d81" ON "pokemon_abilities_ability" ("pokemonId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2dc0964f2f6e725d67f638d7e8" ON "pokemon_abilities_ability" ("abilityName") `);
        await queryRunner.query(`DROP INDEX "IDX_788d754ccb53a6313e2e5728ac"`);
        await queryRunner.query(`DROP INDEX "IDX_02f5ec893d362fa2a62cac6ad3"`);
        await queryRunner.query(`CREATE TABLE "temporary_pokemon_types_type" ("pokemonId" integer NOT NULL, "typeName" varchar NOT NULL, CONSTRAINT "FK_788d754ccb53a6313e2e5728ac2" FOREIGN KEY ("pokemonId") REFERENCES "pokemon" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_02f5ec893d362fa2a62cac6ad38" FOREIGN KEY ("typeName") REFERENCES "type" ("name") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("pokemonId", "typeName"))`);
        await queryRunner.query(`INSERT INTO "temporary_pokemon_types_type"("pokemonId", "typeName") SELECT "pokemonId", "typeName" FROM "pokemon_types_type"`);
        await queryRunner.query(`DROP TABLE "pokemon_types_type"`);
        await queryRunner.query(`ALTER TABLE "temporary_pokemon_types_type" RENAME TO "pokemon_types_type"`);
        await queryRunner.query(`CREATE INDEX "IDX_788d754ccb53a6313e2e5728ac" ON "pokemon_types_type" ("pokemonId") `);
        await queryRunner.query(`CREATE INDEX "IDX_02f5ec893d362fa2a62cac6ad3" ON "pokemon_types_type" ("typeName") `);
        await queryRunner.query(`DROP INDEX "IDX_a419a96ad1ebf84d2e710f04a4"`);
        await queryRunner.query(`DROP INDEX "IDX_97419c45d60270d1363a7717ac"`);
        await queryRunner.query(`CREATE TABLE "temporary_type_pokemons_pokemon" ("typeName" varchar NOT NULL, "pokemonId" integer NOT NULL, CONSTRAINT "FK_a419a96ad1ebf84d2e710f04a44" FOREIGN KEY ("typeName") REFERENCES "type" ("name") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_97419c45d60270d1363a7717ac5" FOREIGN KEY ("pokemonId") REFERENCES "pokemon" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("typeName", "pokemonId"))`);
        await queryRunner.query(`INSERT INTO "temporary_type_pokemons_pokemon"("typeName", "pokemonId") SELECT "typeName", "pokemonId" FROM "type_pokemons_pokemon"`);
        await queryRunner.query(`DROP TABLE "type_pokemons_pokemon"`);
        await queryRunner.query(`ALTER TABLE "temporary_type_pokemons_pokemon" RENAME TO "type_pokemons_pokemon"`);
        await queryRunner.query(`CREATE INDEX "IDX_a419a96ad1ebf84d2e710f04a4" ON "type_pokemons_pokemon" ("typeName") `);
        await queryRunner.query(`CREATE INDEX "IDX_97419c45d60270d1363a7717ac" ON "type_pokemons_pokemon" ("pokemonId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_97419c45d60270d1363a7717ac"`);
        await queryRunner.query(`DROP INDEX "IDX_a419a96ad1ebf84d2e710f04a4"`);
        await queryRunner.query(`ALTER TABLE "type_pokemons_pokemon" RENAME TO "temporary_type_pokemons_pokemon"`);
        await queryRunner.query(`CREATE TABLE "type_pokemons_pokemon" ("typeName" varchar NOT NULL, "pokemonId" integer NOT NULL, PRIMARY KEY ("typeName", "pokemonId"))`);
        await queryRunner.query(`INSERT INTO "type_pokemons_pokemon"("typeName", "pokemonId") SELECT "typeName", "pokemonId" FROM "temporary_type_pokemons_pokemon"`);
        await queryRunner.query(`DROP TABLE "temporary_type_pokemons_pokemon"`);
        await queryRunner.query(`CREATE INDEX "IDX_97419c45d60270d1363a7717ac" ON "type_pokemons_pokemon" ("pokemonId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a419a96ad1ebf84d2e710f04a4" ON "type_pokemons_pokemon" ("typeName") `);
        await queryRunner.query(`DROP INDEX "IDX_02f5ec893d362fa2a62cac6ad3"`);
        await queryRunner.query(`DROP INDEX "IDX_788d754ccb53a6313e2e5728ac"`);
        await queryRunner.query(`ALTER TABLE "pokemon_types_type" RENAME TO "temporary_pokemon_types_type"`);
        await queryRunner.query(`CREATE TABLE "pokemon_types_type" ("pokemonId" integer NOT NULL, "typeName" varchar NOT NULL, PRIMARY KEY ("pokemonId", "typeName"))`);
        await queryRunner.query(`INSERT INTO "pokemon_types_type"("pokemonId", "typeName") SELECT "pokemonId", "typeName" FROM "temporary_pokemon_types_type"`);
        await queryRunner.query(`DROP TABLE "temporary_pokemon_types_type"`);
        await queryRunner.query(`CREATE INDEX "IDX_02f5ec893d362fa2a62cac6ad3" ON "pokemon_types_type" ("typeName") `);
        await queryRunner.query(`CREATE INDEX "IDX_788d754ccb53a6313e2e5728ac" ON "pokemon_types_type" ("pokemonId") `);
        await queryRunner.query(`DROP INDEX "IDX_2dc0964f2f6e725d67f638d7e8"`);
        await queryRunner.query(`DROP INDEX "IDX_cb6559d85c42dbe749ce654d81"`);
        await queryRunner.query(`ALTER TABLE "pokemon_abilities_ability" RENAME TO "temporary_pokemon_abilities_ability"`);
        await queryRunner.query(`CREATE TABLE "pokemon_abilities_ability" ("pokemonId" integer NOT NULL, "abilityName" varchar NOT NULL, PRIMARY KEY ("pokemonId", "abilityName"))`);
        await queryRunner.query(`INSERT INTO "pokemon_abilities_ability"("pokemonId", "abilityName") SELECT "pokemonId", "abilityName" FROM "temporary_pokemon_abilities_ability"`);
        await queryRunner.query(`DROP TABLE "temporary_pokemon_abilities_ability"`);
        await queryRunner.query(`CREATE INDEX "IDX_2dc0964f2f6e725d67f638d7e8" ON "pokemon_abilities_ability" ("abilityName") `);
        await queryRunner.query(`CREATE INDEX "IDX_cb6559d85c42dbe749ce654d81" ON "pokemon_abilities_ability" ("pokemonId") `);
        await queryRunner.query(`ALTER TABLE "pokemon" RENAME TO "temporary_pokemon"`);
        await queryRunner.query(`CREATE TABLE "pokemon" ("id" integer PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "statsId" integer, CONSTRAINT "REL_e46d42c1bd36941969dcc06a01" UNIQUE ("statsId"))`);
        await queryRunner.query(`INSERT INTO "pokemon"("id", "name", "statsId") SELECT "id", "name", "statsId" FROM "temporary_pokemon"`);
        await queryRunner.query(`DROP TABLE "temporary_pokemon"`);
        await queryRunner.query(`DROP INDEX "IDX_97419c45d60270d1363a7717ac"`);
        await queryRunner.query(`DROP INDEX "IDX_a419a96ad1ebf84d2e710f04a4"`);
        await queryRunner.query(`DROP TABLE "type_pokemons_pokemon"`);
        await queryRunner.query(`DROP INDEX "IDX_02f5ec893d362fa2a62cac6ad3"`);
        await queryRunner.query(`DROP INDEX "IDX_788d754ccb53a6313e2e5728ac"`);
        await queryRunner.query(`DROP TABLE "pokemon_types_type"`);
        await queryRunner.query(`DROP INDEX "IDX_2dc0964f2f6e725d67f638d7e8"`);
        await queryRunner.query(`DROP INDEX "IDX_cb6559d85c42dbe749ce654d81"`);
        await queryRunner.query(`DROP TABLE "pokemon_abilities_ability"`);
        await queryRunner.query(`DROP TABLE "type"`);
        await queryRunner.query(`DROP TABLE "pokemon"`);
        await queryRunner.query(`DROP TABLE "stat"`);
        await queryRunner.query(`DROP TABLE "ability"`);
    }

}
