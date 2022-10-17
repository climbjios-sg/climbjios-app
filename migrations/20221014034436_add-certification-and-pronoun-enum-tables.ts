import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('boulderingGrades', function (table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.timestamps(true, true);
    })
    .then(() =>
      knex.schema.createTable('topRopeGrades', function (table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.timestamps(true, true);
      }),
    )
    .then(() =>
      knex.schema.createTable('leadClimbingGrades', function (table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.timestamps(true, true);
      }),
    )
    .then(() =>
      knex.schema.createTable('sncsCertifications', function (table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.timestamps(true, true);
      }),
    )
    .then(() =>
      knex.schema.createTable('pronouns', function (table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.timestamps(true, true);
      }),
    );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('boulderingGrades')
    .then(() => knex.schema.dropTable('topRopeGrades'))
    .then(() => knex.schema.dropTable('leadClimbingGrades'))
    .then(() => knex.schema.dropTable('sncsCertifications'))
    .then(() => knex.schema.dropTable('pronouns'));
}
