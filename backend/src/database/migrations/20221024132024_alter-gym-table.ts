import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('gyms', (table) => {
    table.string('shortName').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('gyms', (table) => {
    table.dropColumn('shortName');
  });
}
