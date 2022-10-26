"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('walls', function (table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.timestamps(true, true);
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('walls');
}
exports.down = down;
//# sourceMappingURL=20221018013646_create_wall_table.js.map