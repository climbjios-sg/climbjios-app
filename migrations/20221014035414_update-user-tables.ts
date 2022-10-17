import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('userProfiles', function (table) {
      table.increments('id').primary();
      table.uuid('userId').notNullable().references('id').inTable('users');
      table.string('name').notNullable();
      table.string('telegramHandle').nullable().unique();
      table.integer('height').nullable();
      table.integer('reach').nullable();
      table
        .integer('pronounId')
        .nullable()
        .references('id')
        .inTable('pronouns');
      table
        .integer('highestBoulderingGradeId')
        .nullable()
        .references('id')
        .inTable('boulderingGrades');
      table
        .integer('highestTopRopeGradeId')
        .nullable()
        .references('id')
        .inTable('topRopeGrades');
      table
        .integer('highestLeadClimbingGradeId')
        .nullable()
        .references('id')
        .inTable('leadClimbingGrades');
      table
        .integer('sncsCertificationId')
        .nullable()
        .references('id')
        .inTable('sncsCertifications');
      table.text('profilePictureUrl').nullable();
      table.timestamps(true, true);
    })
    .then(() =>
      knex.schema.createTable('userProfileFavouriteGyms', function (table) {
        table.primary(['userProfileId', 'gymId']);
        table
          .integer('userProfileId')
          .notNullable()
          .references('id')
          .inTable('userProfiles');
        table.integer('gymId').notNullable().references('id').inTable('gyms');
        table.timestamps(true, true);
      }),
    )
    .then(() => knex.select().from('users'))
    .then((users) =>
      Promise.all(
        users.map((u) =>
          knex('userProfiles').insert({
            name: u.name,
            telegramHandle: u.telegramHandle,
            userId: u.id,
          }),
        ),
      ),
    )
    .then(() =>
      knex.schema.table('users', (t) => {
        t.dropColumns('name', 'username', 'telegramHandle');
      }),
    );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('userProfileFavouriteGyms')
    .then(() =>
      knex.schema.table('users', (t) => {
        t.string('name');
        t.string('username');
        t.string('telegramHandle');
      }),
    )
    .then(() => knex.select().from('userProfiles'))
    .then((userProfiles) =>
      Promise.all(
        userProfiles.map((u) =>
          knex
            .update({
              name: u.name,
              username: u.telegramHandle,
              telegramHandle: u.telegramHandle,
            })
            .from('users')
            .where({ id: u.userId }),
        ),
      ),
    )
    .then(() =>
      knex.schema.alterTable('users', (t) => {
        t.string('name').notNullable().alter();
      }),
    )
    .then(() => knex.schema.dropTable('userProfiles'));
}
