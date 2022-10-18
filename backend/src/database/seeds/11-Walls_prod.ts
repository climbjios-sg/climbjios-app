import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('walls').del();

  // Inserts seed entries
  await knex('walls').insert([
    { name: 'vertical' },
    { name: 'overhang' },
    { name: 'slab' },
  ]);
}
