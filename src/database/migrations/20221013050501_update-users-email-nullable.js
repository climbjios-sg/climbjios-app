"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.alterTable('users', (table) => {
        table.string('email').nullable().alter();
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.alterTable('users', (table) => {
        table.string('email').notNullable().alter();
    });
}
exports.down = down;
//# sourceMappingURL=20221013050501_update-users-email-nullable.js.map