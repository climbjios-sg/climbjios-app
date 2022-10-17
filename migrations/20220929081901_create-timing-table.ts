import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('timings', function (table) {
    table.increments('id').primary();
    table.enu('name', ['morning', 'afternoon', 'evening']).notNullable(); // morning | afternoon | night
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('timings');
}
