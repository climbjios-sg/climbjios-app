import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('userProfiles', function (table) {
    table.boolean('hasProfilePicture').notNullable().defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('userProfiles', function (table) {
    table.dropColumn('hasProfilePicture');
  });
}
