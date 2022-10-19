"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.table('userProfiles', (t) => {
        t.dropColumn('profilePictureUrl');
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.table('userProfiles', (t) => {
        t.text('profilePictureUrl').nullable();
    });
}
exports.down = down;
//# sourceMappingURL=20221017171936_drop-profile-url-column-in-user-profiles.js.map