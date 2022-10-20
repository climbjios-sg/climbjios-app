"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
async function seed(knex) {
    await knex.raw('TRUNCATE TABLE bouldering_grades RESTART IDENTITY CASCADE');
    await knex('boulderingGrades').insert([
        { name: 'v1' },
        { name: 'v2' },
        { name: 'v3' },
        { name: 'v4' },
        { name: 'v5' },
        { name: 'v6' },
        { name: 'v7' },
        { name: 'v8' },
        { name: 'v9' },
        { name: 'v10' },
    ]);
}
exports.seed = seed;
//# sourceMappingURL=04-Bouldering_Grades.js.map