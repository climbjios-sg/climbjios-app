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
  
  // Create database if it does not yet exist
  const r = await knex.raw(`SELECT datname FROM pg_catalog.pg_database WHERE datname = '${databaseName}'`);
  if (!r.rowCount) {
    await knex.raw(`CREATE DATABASE ??`, databaseName);
  }
}

main().catch(console.log).then(process.exit);