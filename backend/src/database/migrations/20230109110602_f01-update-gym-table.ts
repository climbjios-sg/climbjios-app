import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('gyms', (table) => {
    table
      .integer('gymGroupId')
      .notNullable()
      .references('id')
      .inTable('gymGroups')
      .defaultTo(1);
    table.string('address');
    table.string('area');
    table.string('passSharing');
    table.boolean('boulder');
    table.boolean('autoBelay');
    table.boolean('topRope');
    table.boolean('lead');
    table.string('socialUrl');
    table.string('website');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('gyms', (table) => {
    table.dropColumn('gymGroupId');
    table.dropColumn('address');
    table.dropColumn('area');
    table.dropColumn('passSharing');
    table.dropColumn('boulder');
    table.dropColumn('autoBelay');
    table.dropColumn('topRope');
    table.dropColumn('lead');
    table.dropColumn('socialUrl');
    table.dropColumn('website');
  });
}
