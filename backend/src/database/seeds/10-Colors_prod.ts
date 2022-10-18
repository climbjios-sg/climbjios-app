import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('colors').del();

  // Inserts seed entries
  await knex('colors').insert([
    { name: 'red', order: 1 },
    { name: 'orange', order: 2 },
    { name: 'yellow', order: 3 },
    { name: 'green', order: 4 },
    { name: 'teal', order: 5 },
    { name: 'blue', order: 6 },
    { name: 'purple', order: 7 },
    { name: 'pink', order: 8 },
    { name: 'black', order: 9 },
    { name: 'white', order: 10 },
    { name: 'brown', order: 11 },
  ]);
}
