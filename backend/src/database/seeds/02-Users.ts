import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  if (['staging', 'production'].includes(process.env.NODE_ENV)) {
    console.log('skipping user seeds');
    return;
  }

  // Deletes ALL existing entries and reset primary key
  await knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE');

  // Inserts seed entries
  await knex('users').insert([
    {
      name: 'Alison',
      email: 'alison@test.com',
      username: 'alison123',
      telegramHandle: 'alisonTeleMe',
      authProvider: 'test',
      authProviderId: 'authTestId1',
    },
    {
      name: 'Bob',
      email: 'bob@test.com',
      username: 'bob_',
      telegramHandle: 'bob_da_best',
      authProvider: 'test',
      authProviderId: 'authTestId2',
    },
  ]);
}
