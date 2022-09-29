import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .table('users', (table) => {
      table.string('authProviderId').notNullable();
      table.string('email').notNullable();
    })
    .then(() =>
      knex.schema.alterTable('users', (table) => {
        table.string('username').nullable().alter();
        table.string('telegramHandle').nullable().alter();
      }),
    );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .table('users', (table) => {
      table.dropColumn('authProviderId');
      table.dropColumn('email');
    })
    .then(() =>
      knex.schema.alterTable('users', (table) => {
        table.string('username').notNullable().alter();
        table.string('telegramHandle').notNullable().alter();
      }),
    );
}
