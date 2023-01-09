import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('gym_groups', function (table) {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('passSharingConditions');
    table.boolean('permanentlyClosed').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('gym_groups');
}

