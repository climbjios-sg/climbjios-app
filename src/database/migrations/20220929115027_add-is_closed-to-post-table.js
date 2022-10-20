"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.table('posts', (table) => {
        table.boolean('isClosed').notNullable().defaultTo(false);
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.table('posts', (table) => {
        table.dropColumn('isClosed');
    });
}
exports.down = down;
//# sourceMappingURL=20220929115027_add-is_closed-to-post-table.js.map