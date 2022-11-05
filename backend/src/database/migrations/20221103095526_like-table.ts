import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Previous beta likes table has wrong schema, so it's dropped
  await knex.schema.dropTable('betaLikes');
  return knex.schema.createTable('betaLikes', function (table) {
    table.integer('betaId').notNullable().references('id').inTable('betas');
    table.uuid('userId').notNullable().references('id').inTable('users');
    // Unique, each user can only like a beta once
    table.primary(['betaId', 'userId']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('betaLikes');
}
