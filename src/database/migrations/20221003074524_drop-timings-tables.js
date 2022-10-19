"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema
        .dropTable('timing_post')
        .then(() => knex.schema.dropTable('timings'))
        .then(() => knex.schema.table('posts', (t) => {
        t.dropColumn('date');
    }));
}
exports.up = up;
async function down(knex) { }
exports.down = down;
//# sourceMappingURL=20221003074524_drop-timings-tables.js.map