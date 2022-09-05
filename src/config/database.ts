import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const dbConfig: string|any = {
  connectionString: process.env.DATABASE_URL,
  ssl: null
}

if(process.env.MODE === "PROD") {
  dbConfig.ssl = {
    rejectUnauthorized: false
  }
}

const { Pool } = pg;
const database = new Pool(dbConfig);

export default database;
