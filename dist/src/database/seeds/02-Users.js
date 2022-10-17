"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
async function seed(knex) {
    if (['staging', 'production'].includes(process.env.NODE_ENV)) {
        console.log('skipping user seeds');
        return;
    }
    await knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE');
    await knex('users').insert([
        {
            email: 'alison@test.com',
            authProvider: 'google',
            authProviderId: 'authTestId1',
            refreshToken: 'refresh_token',
        },
        {
            authProvider: 'telegram',
            authProviderId: 'authTestId2',
            refreshToken: 'refresh_token',
        },
    ]);
}
exports.seed = seed;
//# sourceMappingURL=02-Users.js.map