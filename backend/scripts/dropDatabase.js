const Knex = require('knex');
require('dotenv').config({ path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}` });

async function main() {
  const connection = {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  };

  const databaseName = process.env.DATABASE_NAME;
  if (!databaseName) {
    throw new Error("Database name not specified!");
  }

  let knex = Knex({
    client: 'pg',
    connection,
  });

  await knex.raw(`DROP DATABASE ??;`, databaseName);
}

main().catch(console.log).then(process.exit);