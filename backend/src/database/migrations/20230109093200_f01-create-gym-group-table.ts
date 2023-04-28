import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('gymGroups', function (table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('iconUrl');
    // table.string('passSharingConditions');
    table.boolean('permanentlyClosed').notNullable().defaultTo(false);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('gymGroups');
}
