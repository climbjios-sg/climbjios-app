import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('posts', function (table) {
    table.datetime('startDateTime').nullable().alter();
    table.datetime('endDateTime').nullable().alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('posts', (table) => {
    table.datetime('startDateTime').notNullable().alter();
    table.datetime('endDateTime').notNullable().alter();
  });
}
