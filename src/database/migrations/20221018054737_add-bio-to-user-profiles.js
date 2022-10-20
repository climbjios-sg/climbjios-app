"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.table('userProfiles', (t) => {
        t.text('bio').nullable();
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.table('userProfiles', (t) => {
        t.dropColumn('bio');
    });
}
exports.down = down;
//# sourceMappingURL=20221018054737_add-bio-to-user-profiles.js.map