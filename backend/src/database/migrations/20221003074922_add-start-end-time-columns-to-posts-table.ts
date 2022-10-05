import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('posts', (t) => {
    t.datetime('startDateTime').notNullable();
    t.datetime('endDateTime').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {}
