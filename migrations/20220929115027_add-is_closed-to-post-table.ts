import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('posts', (table) => {
    table.boolean('isClosed').notNullable().defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('posts', (table) => {
    table.dropColumn('isClosed');
  });
}
