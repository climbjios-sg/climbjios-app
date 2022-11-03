import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('posts', (t) => {
    t.dropPrimary();
    t.uuid('uid').defaultTo(knex.raw('gen_random_uuid()'));
    t.dropColumn('id');
    t.renameColumn('uid', 'id');
    t.primary(['id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('posts', (t) => {
    t.dropPrimary();
    t.increments('newId');
    t.dropColumn('id');
    t.renameColumn('newId', 'id');
    t.primary(['id']);
  });
}
