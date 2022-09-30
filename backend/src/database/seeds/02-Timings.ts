import { Knex } from 'knex';
import { Timing } from '../../utils/types';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries and reset primary key
  await knex.raw('TRUNCATE TABLE timings RESTART IDENTITY CASCADE');

  // Inserts seed entries
  await knex('timings').insert([
    { name: Timing.MORNING },
    { name: Timing.AFTERNOON },
    { name: Timing.EVENING },
  ]);
}
