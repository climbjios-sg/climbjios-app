"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema
        .table('users', (t) => {
        t.string('oauthName').nullable();
    })
        .then(() => knex('userProfiles').select())
        .then((userProfiles) => {
        return Promise.all(userProfiles.map((profile) => knex('users')
            .update({ oauthName: profile.name })
            .where({ id: profile.userId })));
    })
        .then(() => knex.schema.alterTable('users', (t) => {
        t.string('oauthName').notNullable().alter();
    }))
        .then(() => knex.schema.alterTable('userProfiles', (t) => {
        t.string('name').nullable().alter();
    }));
}
exports.up = up;
async function down(knex) {
    return knex('users')
        .select()
        .then((users) => Promise.all(users.map((user) => {
        if (user.oauthName) {
            return knex('userProfiles')
                .update({ name: user.oauthName })
                .where({ userId: user.id })
                .where({ name: null });
        }
    })))
        .then(() => knex.schema.table('users', (t) => {
        t.dropColumn('oauthName');
    }))
        .then(() => knex('userProfiles')
        .update({ name: 'placeholder' })
        .where({ name: null }))
        .then(() => knex.schema.alterTable('userProfiles', (t) => {
        t.string('name').notNullable().alter();
    }));
}
exports.down = down;
//# sourceMappingURL=20221019043126_add-oauth-name-to-users-table.js.map