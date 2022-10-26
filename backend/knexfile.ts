import * as dotenv from 'dotenv';
import { knexSnakeCaseMappers } from 'objection';

const NODE_ENV = process.env.NODE_ENV;
const IS_DEPLOYMENT = ['staging', 'production'].includes(NODE_ENV);

dotenv.config({ path: `.env${NODE_ENV ? `.${NODE_ENV}` : ''}` });

const knexConfig = {
    client: 'pg',
    connection: {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
    },
    migrations: {
        directory: './src/database/migrations',
        loadExtensions: IS_DEPLOYMENT ? ['.js'] : ['.ts'],
    },
    seeds: {
        directory: './src/database/seeds',
        loadExtensions: IS_DEPLOYMENT ? ['.js'] : ['.ts'],
    },
    ...knexSnakeCaseMappers(),
}

export default knexConfig;
