import { Pool } from "pg";

import { parse } from "pg-connection-string";

let pool;

export function getDb() {
  if (!pool) {
    // Supabase sets POSTGRES_URL in the .env.
    // We parse it manually because the URL's ?sslmode=require
    // overrides the rejectUnauthorized: false if passed to Pool directly.
    const config = parse(process.env.POSTGRES_URL);
    config.ssl = {
      rejectUnauthorized: false
    };
    
    pool = new Pool(config);
  }
  return pool;
}

export async function initDb() {
  const db = getDb();
  await db.query(`
    CREATE TABLE IF NOT EXISTS scores (
      id          SERIAL PRIMARY KEY,
      userid      TEXT    NOT NULL UNIQUE,
      firstname   TEXT    DEFAULT '',
      lastname    TEXT    DEFAULT '',
      score       INTEGER NOT NULL,
      created_at  TIMESTAMP DEFAULT NOW(),
      updated_at  TIMESTAMP DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_scores_score ON scores (score ASC);
  `);
}

export default getDb;
