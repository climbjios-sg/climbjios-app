import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('posts', (t) => {
    t.integer('telegramAlertMessageId');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('posts', (t) => {
    t.dropColumn('telegramAlertMessageId');
  });
}
