"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('gymGroups', function (table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('iconUrl');
        table.boolean('permanentlyClosed').notNullable().defaultTo(false);
        table.timestamps(true, true);
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('gymGroups');
}
exports.down = down;
//# sourceMappingURL=20230109093200_f01-create-gym-group-table.js.map