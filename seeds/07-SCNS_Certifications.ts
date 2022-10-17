import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries and reset primary key
  await knex.raw('TRUNCATE TABLE sncs_certifications RESTART IDENTITY CASCADE');

  // Inserts seed entries
  await knex('sncsCertifications').insert([
    { name: 'Level 1' },
    { name: 'Level 2' },
    { name: 'Level 3' },
  ]);
}
