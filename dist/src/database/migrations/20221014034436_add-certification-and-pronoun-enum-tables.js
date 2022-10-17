"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema
        .createTable('boulderingGrades', function (table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.timestamps(true, true);
    })
        .then(() => knex.schema.createTable('topRopeGrades', function (table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.timestamps(true, true);
    }))
        .then(() => knex.schema.createTable('leadClimbingGrades', function (table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.timestamps(true, true);
    }))
        .then(() => knex.schema.createTable('sncsCertifications', function (table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.timestamps(true, true);
    }))
        .then(() => knex.schema.createTable('pronouns', function (table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.timestamps(true, true);
    }));
}
exports.up = up;
async function down(knex) {
    return knex.schema
        .dropTable('boulderingGrades')
        .then(() => knex.schema.dropTable('topRopeGrades'))
        .then(() => knex.schema.dropTable('leadClimbingGrades'))
        .then(() => knex.schema.dropTable('sncsCertifications'))
        .then(() => knex.schema.dropTable('pronouns'));
}
exports.down = down;
//# sourceMappingURL=20221014034436_add-certification-and-pronoun-enum-tables.js.map