import * as dotenv from 'dotenv';

dotenv.config();

const { DATABASE_URL, PORT, LOCAL_HOST, PRODUCTION_HOST } = process.env;

const config = {
  DATABASE_URL,
  PORT,
  LOCAL_HOST,
  PRODUCTION_HOST,
};

export default config;
