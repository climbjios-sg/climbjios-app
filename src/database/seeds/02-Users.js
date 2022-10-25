"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = exports.MOCK_USER_1_UUID = void 0;
exports.MOCK_USER_1_UUID = '4394cce2-7f04-41f2-8ade-8b21cad1cb20';
const MOCK_USER_2_UUID = '030eeafc-26cc-4e16-8467-f55b818689fa';
async function seed(knex) {
    if (['staging', 'production'].includes(process.env.NODE_ENV)) {
        console.log('skipping user seeds');
        return;
    }
    await knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE');
    await knex('users').insert([
        {
            id: exports.MOCK_USER_1_UUID,
            email: 'alison@test.com',
            oauthName: 'Alison Lim',
            authProvider: 'google',
            authProviderId: 'authTestId1',
            refreshToken: 'refresh_token',
        },
        {
            id: MOCK_USER_2_UUID,
            oauthName: 'Bob Tan',
            authProvider: 'telegram',
            authProviderId: 'authTestId2',
            refreshToken: 'refresh_token',
        },
    ]);
}
exports.seed = seed;
//# sourceMappingURL=02-Users.js.map