"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('betaLikes', function (table) {
        table.integer('gymId').notNullable().references('id').inTable('gyms');
        table.uuid('userId').notNullable().references('id').inTable('users');
        table.primary(['gymId', 'userId']);
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('betaLikes');
}
exports.down = down;
//# sourceMappingURL=20221018042848_create_likes_table.js.map