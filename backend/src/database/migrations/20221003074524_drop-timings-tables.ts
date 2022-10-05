import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('timing_post')
    .then(() => knex.schema.dropTable('timings'))
    .then(() =>
      knex.schema.table('posts', (t) => {
        t.dropColumn('date');
      }),
    );
}

export async function down(knex: Knex): Promise<void> {}
