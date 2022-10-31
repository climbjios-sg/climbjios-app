"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema
        .table('posts', (t) => {
        t.enu('status', ['closed', 'expired', 'open']);
    })
        .then(() => knex.select().from('posts'))
        .then((posts) => Promise.all(posts.map((post) => knex
        .update({ status: post.isClosed ? 'closed' : 'open' })
        .from('posts')
        .where('id', post.id))))
        .then(() => knex.raw(`ALTER TABLE posts ALTER COLUMN type SET NOT NULL;`))
        .then(() => knex.schema.table('posts', (t) => {
        t.dropColumn('isClosed');
    }));
}
exports.up = up;
async function down(knex) { }
exports.down = down;
//# sourceMappingURL=20221031072026_update-is-closed-to-status-posts-model.js.map