import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('posts', function (table) {
    table.increments('id').primary();
    table.uuid('userId').notNullable().references('id').inTable('users');
    table.boolean('isBuy').notNullable();
    table.integer('numPasses').notNullable();
    table.float('price'); // optional: buyers should not specify price
    table.integer('gymId').notNullable().references('id').inTable('gyms');
    table.date('date').notNullable();
    table.boolean('openToClimbTogether').notNullable();
    table.text('optionalNote');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('posts');
}
