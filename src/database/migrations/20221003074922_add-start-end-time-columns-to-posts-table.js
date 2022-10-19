"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.table('posts', (t) => {
        t.datetime('startDateTime').notNullable();
        t.datetime('endDateTime').notNullable();
    });
}
exports.up = up;
async function down(knex) { }
exports.down = down;
//# sourceMappingURL=20221003074922_add-start-end-time-columns-to-posts-table.js.map