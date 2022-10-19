"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
async function seed(knex) {
    await knex.raw('TRUNCATE TABLE top_rope_grades RESTART IDENTITY CASCADE');
    await knex('topRopeGrades').insert([
        { name: '4' },
        { name: '5c' },
        { name: '6a' },
        { name: '6a+' },
        { name: '6b' },
        { name: '6b+' },
        { name: '6c' },
        { name: '6c+' },
        { name: '7a' },
        { name: '7a+' },
        { name: '7b' },
        { name: '7b+' },
        { name: '7c' },
        { name: '7c+' },
        { name: '8a' },
        { name: '8a+' },
        { name: '8b' },
        { name: '8b+' },
        { name: '8c' },
        { name: '8c+' },
        { name: '9a' },
    ]);
}
exports.seed = seed;
//# sourceMappingURL=05-Top_Rope_Grades.js.map