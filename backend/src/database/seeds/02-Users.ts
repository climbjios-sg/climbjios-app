import { Knex } from 'knex';

export const MOCK_USER_1_UUID = '4394cce2-7f04-41f2-8ade-8b21cad1cb20';
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
      refreshToken: 'refresh_token',
    },
    {
      oauthName: 'Bob Tan',
      authProvider: 'telegram',
      authProviderId: 'authTestId2',
      refreshToken: 'refresh_token',
    },
  ]);
}
