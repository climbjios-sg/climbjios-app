import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('refreshTokens', (t) => {
      t.increments('id').primary();
      t.uuid('userId').references('id').inTable('users').notNullable();
      t.string('refreshToken').notNullable();
      t.timestamps(true, true);
    })
    .then(() => knex.select().from('users'))
    .then((users) =>
      Promise.all(
        users.map((u) =>
          knex
            .insert({ userId: u.id, refreshToken: u.refreshToken })
            .into('refreshTokens'),
        ),
      ),
    )
    .then(() =>
      knex.schema.table('users', (t) => {
        t.dropColumn('refreshToken');
      }),
    );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .table('users', (t) => {
      t.string('refreshToken');
    })
    .then(() => knex.select().from('users'))
    .then((users) =>
      Promise.all(
        users.map((u) =>
          knex
            .select()
            .from('refreshTokens')
            .where('userId', u.id)
            .first()
            .then((e) =>
              knex('users')
                .update({ refreshToken: e.refreshToken })
                .where('id', u.id),
            ),
        ),
      ),
    )
    .then(() => knex.schema.dropTable('refreshTokens'));
}
