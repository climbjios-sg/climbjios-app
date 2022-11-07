import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Update gym grade order in BFF Bkt Timah
  await knex('gymGrades')
    .update({ gymId: 4, name: 'Wildcard', order: 160 })
    .where({ gymId: 4, name: 'Wildcard', order: 13 });
  // Update gym grade order in BFF Bendemeer
  await knex('gymGrades')
    .update({ gymId: 5, name: 'Wildcard', order: 160 })
    .where({ gymId: 5, name: 'Wildcard', order: 13 });
}

export async function down(knex: Knex): Promise<void> {
  await knex('gymGrades')
    .update({ gymId: 4, name: 'Wildcard', order: 13 })
    .where({ gymId: 4, name: 'Wildcard', order: 160 });

  await knex('gymGrades')
    .update({ gymId: 5, name: 'Wildcard', order: 13 })
    .where({ gymId: 5, name: 'Wildcard', order: 160 });
}
