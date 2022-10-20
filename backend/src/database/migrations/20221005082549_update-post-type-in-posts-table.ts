import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .table('posts', (t) => {
      t.enu('type', ['buyer', 'seller', 'other']);
    })
    .then(() => knex.select().from('posts'))
    .then((posts) =>
      Promise.all(
        posts.map((p) =>
          p.isBuy
            ? knex.update({ type: 'buyer' }).from('posts').where('id', p.id)
            : knex.update({ type: 'seller' }).from('posts').where('id', p.id),
        ),
      ),
    )
    .then(() => knex.raw(`ALTER TABLE posts ALTER COLUMN type SET NOT NULL;`))
    .then(() =>
      knex.schema.table('posts', (t) => {
        t.dropColumn('isBuy');
      }),
    );
}

export async function down(knex: Knex): Promise<void> {}
