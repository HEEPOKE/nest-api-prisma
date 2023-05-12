import * as dotenv from 'dotenv';

dotenv.config();

const { DATABASE_URL, PORT } = process.env;

const config = {
  DATABASE_URL,
  PORT,
};

export default config;
