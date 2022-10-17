"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('gyms', function (table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.boolean('permanentlyClosed').notNullable();
        table.timestamps(true, true);
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('gyms');
}
exports.down = down;
//# sourceMappingURL=20220929080624_create-gym-table.js.map