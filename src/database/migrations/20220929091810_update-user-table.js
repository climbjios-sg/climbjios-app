"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema
        .table('users', (table) => {
        table.string('authProviderId').notNullable();
        table.string('email').notNullable();
    })
        .then(() => knex.schema.alterTable('users', (table) => {
        table.string('username').nullable().alter();
        table.string('telegramHandle').nullable().alter();
    }));
}
exports.up = up;
async function down(knex) {
    return knex.schema
        .table('users', (table) => {
        table.dropColumn('authProviderId');
        table.dropColumn('email');
    })
        .then(() => knex.schema.alterTable('users', (table) => {
        table.string('username').notNullable().alter();
        table.string('telegramHandle').notNullable().alter();
    }));
}
exports.down = down;
//# sourceMappingURL=20220929091810_update-user-table.js.map