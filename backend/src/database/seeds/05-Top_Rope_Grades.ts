import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries and reset primary key
  await knex.raw('TRUNCATE TABLE top_rope_grades RESTART IDENTITY CASCADE');

  // Inserts seed entries
  await knex('topRopeGrades').insert([
    { name: '4' },
    { name: '5c' },
    { name: '6a' },
    { name: '6a+' },
    { name: '6b' },
    { name: '6b+' },
    { name: '6c' },
    { name: '6c+' },
    { name: '7a' },
    { name: '7a+' },
    { name: '7b' },
    { name: '7b+' },
    { name: '7c' },
    { name: '7c+' },
    { name: '8a' },
    { name: '8a+' },
    { name: '8b' },
    { name: '8b+' },
    { name: '8c' },
    { name: '8c+' },
    { name: '9a' },
  ]);
}
