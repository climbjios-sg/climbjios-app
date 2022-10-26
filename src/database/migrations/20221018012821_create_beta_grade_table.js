"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('gymGrades', function (table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.integer('gymId').notNullable().references('id').inTable('gyms');
        table.integer('order').notNullable();
        table.timestamps(true, true);
        table.unique(['gymId', 'order']);
        table.unique(['gymId', 'name']);
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('gymGrades');
}
exports.down = down;
//# sourceMappingURL=20221018012821_create_beta_grade_table.js.map