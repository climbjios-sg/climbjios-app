"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema
        .createTable('refreshTokens', (t) => {
        t.increments('id').primary();
        t.uuid('userId').references('id').inTable('users').notNullable();
        t.string('refreshToken').notNullable();
        t.timestamps(true, true);
    })
        .then(() => knex.select().from('users'))
        .then((users) => Promise.all(users.map((u) => knex
        .insert({ userId: u.id, refreshToken: u.refreshToken })
        .into('refreshTokens'))))
        .then(() => knex.schema.table('users', (t) => {
        t.dropColumn('refreshToken');
    }));
}
exports.up = up;
async function down(knex) {
    return knex.schema
        .table('users', (t) => {
        t.string('refreshToken');
    })
        .then(() => knex.select().from('users'))
        .then((users) => Promise.all(users.map((u) => knex
        .select()
        .from('refreshTokens')
        .where('userId', u.id)
        .first()
        .then((e) => knex('users')
        .update({ refreshToken: e.refreshToken })
        .where('id', u.id)))))
        .then(() => knex.schema.dropTable('refreshTokens'));
}
exports.down = down;
//# sourceMappingURL=20221031143616_add-refresh-token-table.js.map