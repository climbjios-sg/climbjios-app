import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('timing_post', function (table) {
    table.primary(['timingId', 'postId']);
    table.integer('timingId').notNullable().references('id').inTable('timings');
    table.integer('postId').notNullable().references('id').inTable('posts');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('timing_post');
}
