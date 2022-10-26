"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
async function seed(knex) {
    if (['staging', 'production'].includes(process.env.NODE_ENV)) {
        console.log('skipping user profile seeds');
        return;
    }
    await knex.raw('TRUNCATE TABLE user_profiles RESTART IDENTITY CASCADE');
    const userIds = await knex('users')
        .select('id')
        .then((users) => users.map((u) => u.id));
    await knex('userProfiles').insert([
        {
            userId: userIds[0],
            name: 'Alison',
            telegramHandle: 'alison123',
            height: 156,
            reach: -18,
            pronounId: 2,
            highestBoulderingGradeId: 1,
            highestTopRopeGradeId: 1,
        },
        {
            userId: userIds[1],
            name: 'Bob',
            telegramHandle: 'bob_da_best',
            highestLeadClimbingGradeId: 2,
            sncsCertificationId: 2,
            hasProfilePicture: true,
        },
    ]);
}
exports.seed = seed;
//# sourceMappingURL=09-User_Profiles.js.map