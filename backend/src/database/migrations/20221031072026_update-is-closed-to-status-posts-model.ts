import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .table('posts', (t) => {
      t.enu('status', ['closed', 'expired', 'open']);
    })
    .then(() => knex.select().from('posts'))
    .then((posts) =>
      Promise.all(
        posts.map((post) =>
          knex
            .update({ status: post.isClosed ? 'closed' : 'open' })
            .from('posts')
            .where('id', post.id),
        ),
      ),
    )
    .then(() => knex.raw(`ALTER TABLE posts ALTER COLUMN type SET NOT NULL;`))
    .then(() =>
      knex.schema.table('posts', (t) => {
        t.dropColumn('isClosed');
      }),
    );
}

export async function down(knex: Knex): Promise<void> {}
