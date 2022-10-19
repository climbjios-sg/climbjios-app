"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema
        .table('posts', (t) => {
        t.enu('type', ['buyer', 'seller', 'other']);
    })
        .then(() => knex.select().from('posts'))
        .then((posts) => Promise.all(posts.map((p) => p.isBuy
        ? knex.update({ type: 'buyer' }).from('posts').where('id', p.id)
        : knex.update({ type: 'seller' }).from('posts').where('id', p.id))))
        .then(() => knex.raw(`ALTER TABLE posts ALTER COLUMN type SET NOT NULL;`))
        .then(() => knex.schema.table('posts', (t) => {
        t.dropColumn('isBuy');
    }));
}
exports.up = up;
async function down(knex) { }
exports.down = down;
//# sourceMappingURL=20221005082549_update-post-type-in-posts-table.js.map