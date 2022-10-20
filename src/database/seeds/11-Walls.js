"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
async function seed(knex) {
    await knex.raw('TRUNCATE TABLE walls RESTART IDENTITY CASCADE');
    await knex('walls').insert([
        { name: 'vertical' },
        { name: 'overhang' },
        { name: 'slab' },
    ]);
}
exports.seed = seed;
//# sourceMappingURL=11-Walls.js.map