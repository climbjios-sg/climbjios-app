"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.alterTable('posts', function (table) {
        table.datetime('startDateTime').nullable().alter();
        table.datetime('endDateTime').nullable().alter();
    });
}
exports.up = up;
async function down(knex) {
    await knex('posts').delete().where({
        startDateTime: null,
    });
    await knex('posts').delete().where({
        endDateTime: null,
    });
    return knex.schema.alterTable('posts', (table) => {
        table.datetime('startDateTime').notNullable().alter();
        table.datetime('endDateTime').notNullable().alter();
    });
}
exports.down = down;
//# sourceMappingURL=20221107132719_datetime-nullable.js.map