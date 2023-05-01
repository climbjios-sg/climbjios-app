"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.table('gyms', (table) => {
        table
            .integer('gymGroupId')
            .notNullable()
            .references('id')
            .inTable('gymGroups')
            .defaultTo(1);
        table.string('address');
        table.string('area');
        table.string('passSharing');
        table.boolean('boulder');
        table.boolean('autoBelay');
        table.boolean('topRope');
        table.boolean('lead');
        table.string('socialUrl');
        table.string('website');
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.table('gyms', (table) => {
        table.dropColumn('gymGroupId');
        table.dropColumn('address');
        table.dropColumn('area');
        table.dropColumn('passSharing');
        table.dropColumn('boulder');
        table.dropColumn('autoBelay');
        table.dropColumn('topRope');
        table.dropColumn('lead');
        table.dropColumn('socialUrl');
        table.dropColumn('website');
    });
}
exports.down = down;
//# sourceMappingURL=20230109110602_f01-update-gym-table.js.map