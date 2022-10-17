import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterView('posts', (view) => {
    view.column('userId').rename('creatorId');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterView('posts', (view) => {
    view.column('creatorId').rename('userId');
  });
}
