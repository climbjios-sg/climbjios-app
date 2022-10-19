import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE walls RESTART IDENTITY CASCADE');

  // Inserts seed entries
  await knex('walls').insert([
    { name: 'vertical' },
    { name: 'overhang' },
    { name: 'slab' },
  ]);
}
