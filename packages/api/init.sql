# SQL init script — runs automatically when the PostgreSQL container starts for the first time.
# Located at /docker-entrypoint-initdb.d/init.sql inside the container.

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
