"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema
        .createTable('passes', function (table) {
        table.increments('id').primary();
        table.integer('passGroupId').notNullable;
        table.string('passName').notNullable();
        table.integer('numberOfPasses').notNullable();
        table.float('price').notNullable();
        table.float('discountedPrice');
        table.string('paymentFrequency');
        table.float('initiationFee');
        table.float('discountedInitiationFee');
        table.float('freezingFee');
        table.string('ageRestriction');
        table.string('sharingPolicy');
        table.string('timeRestriction');
        table.string('validityPeriod');
        table.string('infoUrl');
        table.string('remarks');
        table.timestamps(true, true);
    })
        .then(() => knex.schema.table('gymGroups', (table) => {
        table.integer('passGroupId');
    }))
        .then(() => knex.schema.table('gyms', (table) => {
        table.integer('passGroupId');
    }));
}
exports.up = up;
async function down(knex) {
    return knex.schema
        .dropTable('passes')
        .then(() => knex.schema.table('gymGroups', (table) => {
        table.dropColumn('passGroupId');
    }))
        .then(() => knex.schema.table('gyms', (table) => {
        table.dropColumn('passGroupId');
    }));
}
exports.down = down;
//# sourceMappingURL=20230410082446_f01-create-passes-table-and-references.js.map