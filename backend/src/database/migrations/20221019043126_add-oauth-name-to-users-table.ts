import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .table('users', (t) => {
      t.string('oauthName').nullable();
    })
    .then(() => knex('userProfiles').select())
    .then((userProfiles) => {
      return Promise.all(
        userProfiles.map((profile) =>
          knex('users')
            .update({ oauthName: profile.name })
            .where({ id: profile.userId }),
        ),
      );
    })
    .then(() =>
      knex.schema.alterTable('users', (t) => {
        t.string('oauthName').notNullable().alter();
      }),
    )
    .then(() =>
      knex.schema.alterTable('userProfiles', (t) => {
        t.string('name').nullable().alter();
      }),
    );
}

export async function down(knex: Knex): Promise<void> {
  return knex('users')
    .select()
    .then((users) =>
      Promise.all(
        users.map((user) => {
          if (user.oauthName) {
            return knex('userProfiles')
              .update({ name: user.oauthName })
              .where({ userId: user.id })
              .where({ name: null });
          }
        }),
      ),
    )
    .then(() =>
      knex.schema.table('users', (t) => {
        t.dropColumn('oauthName');
      }),
    )
    .then(() =>
      knex('userProfiles')
        .update({ name: 'placeholder' })
        .where({ name: null }),
    )
    .then(() =>
      knex.schema.alterTable('userProfiles', (t) => {
        t.string('name').notNullable().alter();
      }),
    );
}
