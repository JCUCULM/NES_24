import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

export default {
  development: {
    username: process.env.DDBB_USER,
    password: process.env.DDBB_PASSWORD,
    database: process.env.DDBB_NAME,
    host: process.env.DDBB_HOST,
    dialect: 'mysql',
  },
  test: {
    username: process.env.DDBB_USER,
    password: process.env.DDBB_PASSWORD,
    database: process.env.DDBB_NAME,
    host: process.env.DDBB_HOST,
    dialect: 'mysql',
  },
  production: {
    username: process.env.DDBB_USER,
    password: process.env.DDBB_PASSWORD,
    database: process.env.DDBB_NAME,
    host: process.env.DDBB_HOST,
    dialect: 'mysql',
  },
};