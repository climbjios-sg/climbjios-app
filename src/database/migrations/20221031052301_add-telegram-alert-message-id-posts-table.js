"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.table('posts', (t) => {
        t.integer('telegramAlertMessageId');
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.table('posts', (t) => {
        t.dropColumn('telegramAlertMessageId');
    });
}
exports.down = down;
//# sourceMappingURL=20221031052301_add-telegram-alert-message-id-posts-table.js.map