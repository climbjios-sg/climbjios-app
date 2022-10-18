import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries and reset primary key
  await knex.raw('TRUNCATE TABLE bouldering_grades RESTART IDENTITY CASCADE');

  // Inserts seed entries
  await knex('boulderingGrades').insert([
    { name: 'v1' },
    { name: 'v2' },
    { name: 'v3' },
    { name: 'v4' },
    { name: 'v5' },
    { name: 'v6' },
    { name: 'v7' },
    { name: 'v8' },
    { name: 'v9' },
    { name: 'v10' },
  ]);
}
