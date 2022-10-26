"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.alterTable('userProfiles', function (table) {
        table.boolean('hasProfilePicture').notNullable().defaultTo(0);
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.alterTable('userProfiles', function (table) {
        table.dropColumn('hasProfilePicture');
    });
}
exports.down = down;
//# sourceMappingURL=20221025023108_add-has-profile-image.js.map