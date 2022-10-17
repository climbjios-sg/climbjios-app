"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.alterView('posts', (view) => {
        view.column('userId').rename('creatorId');
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.alterView('posts', (view) => {
        view.column('creatorId').rename('userId');
    });
}
exports.down = down;
//# sourceMappingURL=20221015161943_update-posts-userId-to-creatorId.js.map