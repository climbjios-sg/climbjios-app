import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('gymGrades', function (table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.integer('gymId').notNullable().references('id').inTable('gyms');
    // Ascending order of difficulty i.e. v1 - v10
    table.integer('order').notNullable();
    table.timestamps(true, true);
    // Grade for each gym has unique order and name
    table.unique(['gymId', 'order']);
    table.unique(['gymId', 'name']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('gymGrades');
}
