"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
async function seed(knex) {
    await knex.raw('TRUNCATE TABLE colors RESTART IDENTITY CASCADE');
    await knex('colors').insert([
        { name: 'red', order: 1 },
        { name: 'orange', order: 2 },
        { name: 'yellow', order: 3 },
        { name: 'green', order: 4 },
        { name: 'teal', order: 5 },
        { name: 'blue', order: 6 },
        { name: 'purple', order: 7 },
        { name: 'pink', order: 8 },
        { name: 'black', order: 9 },
        { name: 'white', order: 10 },
        { name: 'brown', order: 11 },
    ]);
}
exports.seed = seed;
//# sourceMappingURL=10-Colors.js.map