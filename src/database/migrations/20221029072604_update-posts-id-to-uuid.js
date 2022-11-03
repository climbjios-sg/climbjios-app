"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.alterTable('posts', (t) => {
        t.dropPrimary();
        t.uuid('uid').defaultTo(knex.raw('gen_random_uuid()'));
        t.dropColumn('id');
        t.renameColumn('uid', 'id');
        t.primary(['id']);
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.alterTable('posts', (t) => {
        t.dropPrimary();
        t.increments('newId');
        t.dropColumn('id');
        t.renameColumn('newId', 'id');
        t.primary(['id']);
    });
}
exports.down = down;
//# sourceMappingURL=20221029072604_update-posts-id-to-uuid.js.map