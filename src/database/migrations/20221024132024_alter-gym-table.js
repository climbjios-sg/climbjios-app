"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.table('gyms', (table) => {
        table.string('shortName').nullable();
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.alterTable('gyms', (table) => {
        table.dropColumn('shortName');
    });
}
exports.down = down;
//# sourceMappingURL=20221024132024_alter-gym-table.js.map