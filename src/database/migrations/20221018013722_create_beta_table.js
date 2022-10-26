"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('betas', function (table) {
        table.increments('id').primary();
        table.uuid('creatorId').notNullable().references('id').inTable('users');
        table.integer('gymId').notNullable().references('id').inTable('gyms');
        table
            .integer('gymGradeId')
            .notNullable()
            .references('id')
            .inTable('gymGrades');
        table.integer('colorId').notNullable().references('id').inTable('colors');
        table.integer('wallId').notNullable().references('id').inTable('walls');
        table.string('cloudflareVideoUid').notNullable();
        table.timestamps(true, true);
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('betas');
}
exports.down = down;
//# sourceMappingURL=20221018013722_create_beta_table.js.map