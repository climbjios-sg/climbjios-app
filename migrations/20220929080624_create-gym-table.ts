import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('gyms', function (table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.boolean('permanentlyClosed').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('gyms');
}
