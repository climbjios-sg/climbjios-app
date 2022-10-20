import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('betaLikes', function (table) {
    table.integer('gymId').notNullable().references('id').inTable('gyms');
    table.uuid('userId').notNullable().references('id').inTable('users');
    table.primary(['gymId', 'userId']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('betaLikes');
}
