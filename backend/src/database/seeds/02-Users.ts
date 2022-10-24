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
