"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
async function seed(knex) {
    await knex.raw('TRUNCATE TABLE colors RESTART IDENTITY CASCADE');
    await knex('colors').insert([
        { name: 'Red', order: 1 },
        { name: 'Orange', order: 2 },
        { name: 'Yellow', order: 3 },
        { name: 'Green', order: 4 },
        { name: 'Teal', order: 5 },
        { name: 'Blue', order: 6 },
        { name: 'Purple', order: 7 },
        { name: 'Pink', order: 8 },
        { name: 'Black', order: 9 },
        { name: 'White', order: 10 },
        { name: 'Brown', order: 11 },
    ]);
}
exports.seed = seed;
//# sourceMappingURL=10-Colors.js.map