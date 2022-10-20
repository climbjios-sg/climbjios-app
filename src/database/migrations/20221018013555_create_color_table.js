"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('colors', function (table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.integer('order').notNullable();
        table.timestamps(true, true);
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('colors');
}
exports.down = down;
//# sourceMappingURL=20221018013555_create_color_table.js.map