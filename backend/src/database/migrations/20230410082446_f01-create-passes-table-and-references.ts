import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('passes', function (table) {
      table.increments('id').primary();
      table.integer('passGroupId').notNullable;
      table.string('passName').notNullable();
      table.integer('numberOfPasses').notNullable();
      table.float('price').notNullable();
      table.float('discountedPrice');
      table.string('paymentFrequency');
      table.float('initiationFee');
      table.float('discountedInitiationFee');
      table.float('freezingFee'); //string or integer?
      table.string('ageRestriction');
      table.string('sharingPolicy');
      table.string('timeRestriction');
      table.string('validityPeriod');
      table.string('infoUrl');
      table.string('remarks');
      table.timestamps(true, true);
    })
    .then(() =>
      //add passGroupId reference column to gym groups table
      knex.schema.table('gymGroups', (table) => {
        table.integer('passGroupId');
        // .references('passGroupId') //I seem to have created an artifical join table without actually haveing a join table?
        // .inTable('passes');
      }),
    )
    .then(() =>
      //add passGroupId reference column to gyms table
      knex.schema.table('gyms', (table) => {
        table.integer('passGroupId');
        // .references('passGroupId')
        // .inTable('passes');
      }),
    );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('passes')
    .then(() =>
      knex.schema.table('gymGroups', (table) => {
        table.dropColumn('passGroupId');
      }),
    )
    .then(() =>
      knex.schema.table('gyms', (table) => {
        table.dropColumn('passGroupId');
      }),
    );
}
