import "dotenv/config";
import { Pool } from "pg";

const DATABASE_URL =
  process.env.DATABASE_URL ??
  "postgres://watchdog:watchdog@localhost:5445/watchdog";

const pool = new Pool({
  connectionString: DATABASE_URL,
  // Sensible pool settings for both dev and production
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
});

/**
 * Run the schema migration on startup.
 * The init.sql file handles this in Docker, but running it here
 * ensures the table exists when running locally too.
 */
export async function initDb(): Promise<void> {
  await pool.query(`
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";

    CREATE TABLE IF NOT EXISTS errors (
      id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
      project_id  TEXT        NOT NULL,
      type        TEXT        NOT NULL DEFAULT 'error',
      message     TEXT        NOT NULL,
      stack       TEXT,
      url         TEXT,
      user_agent  TEXT,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_errors_project_id ON errors (project_id);
    CREATE INDEX IF NOT EXISTS idx_errors_created_at ON errors (created_at DESC);
  `);
}

export default pool;
