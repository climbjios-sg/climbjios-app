"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
async function seed(knex) {
    await knex.raw('TRUNCATE TABLE pronouns RESTART IDENTITY CASCADE');
    await knex('pronouns').insert([
        { name: 'He/Him' },
        { name: 'She/Her' },
        { name: 'They/Them' },
        { name: 'Prefer not to say' },
    ]);
}
exports.seed = seed;
//# sourceMappingURL=08-Pronouns.js.map