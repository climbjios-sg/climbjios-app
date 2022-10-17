import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries and reset primary key
  await knex.raw('TRUNCATE TABLE pronouns RESTART IDENTITY CASCADE');

  // Inserts seed entries
  await knex('pronouns').insert([
    { name: 'He/Him' },
    { name: 'She/Her' },
    { name: 'They/Them' },
    { name: 'Prefer not to say' },
  ]);
}
