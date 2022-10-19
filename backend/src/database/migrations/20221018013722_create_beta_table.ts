import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('betas', function (table) {
    table.increments('id').primary();
    table.uuid('creatorId').notNullable().references('id').inTable('users');
    table.integer('gymId').notNullable().references('id').inTable('gyms');
    table
      .integer('gymGradeId')
      .notNullable()
      .references('id')
      .inTable('gymGrades');
    table.integer('colorId').notNullable().references('id').inTable('colors');
    table.integer('wallId').notNullable().references('id').inTable('walls');
    table.string('cloudflareVideoUid').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('betas');
}
