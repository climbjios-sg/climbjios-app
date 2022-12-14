import { Knex } from 'knex';

export const MOCK_USER_1_UUID = '4394cce2-7f04-41f2-8ade-8b21cad1cb20';
const MOCK_USER_2_UUID = '030eeafc-26cc-4e16-8467-f55b818689fa';
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
      id: MOCK_USER_1_UUID,
      email: 'alison@test.com',
      oauthName: 'Alison Lim',
      authProvider: 'google',
      authProviderId: 'authTestId1',
    },
    {
      id: MOCK_USER_2_UUID,
      oauthName: 'Bob Tan',
      authProvider: 'telegram',
      authProviderId: 'authTestId2',
    },
  ]);
}
