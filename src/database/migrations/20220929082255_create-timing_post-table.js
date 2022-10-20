"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('timing_post', function (table) {
        table.primary(['timingId', 'postId']);
        table.integer('timingId').notNullable().references('id').inTable('timings');
        table.integer('postId').notNullable().references('id').inTable('posts');
        table.timestamps(true, true);
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('timing_post');
}
exports.down = down;
//# sourceMappingURL=20220929082255_create-timing_post-table.js.map