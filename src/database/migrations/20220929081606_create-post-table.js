"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('posts', function (table) {
        table.increments('id').primary();
        table.uuid('userId').notNullable().references('id').inTable('users');
        table.boolean('isBuy').notNullable();
        table.integer('numPasses').notNullable();
        table.float('price');
        table.integer('gymId').notNullable().references('id').inTable('gyms');
        table.date('date').notNullable();
        table.boolean('openToClimbTogether').notNullable();
        table.text('optionalNote');
        table.timestamps(true, true);
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('posts');
}
exports.down = down;
//# sourceMappingURL=20220929081606_create-post-table.js.map