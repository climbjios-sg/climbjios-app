"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('timings', function (table) {
        table.increments('id').primary();
        table.enu('name', ['morning', 'afternoon', 'evening']).notNullable();
        table.timestamps(true, true);
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('timings');
}
exports.down = down;
//# sourceMappingURL=20220929081901_create-timing-table.js.map