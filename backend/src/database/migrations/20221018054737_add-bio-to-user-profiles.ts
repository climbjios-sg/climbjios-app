import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('userProfiles', (t) => {
    t.text('bio').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('userProfiles', (t) => {
    t.dropColumn('bio');
  });
}
