import Database from "better-sqlite3";
import path from "path";

// Store the DB file at project root (gitignored)
const DB_PATH = path.join(process.cwd(), "magalang.db");

let _db;

function getDb() {
  if (!_db) {
    _db = new Database(DB_PATH);
    _db.pragma("journal_mode = WAL");
    _db.exec(`
      CREATE TABLE IF NOT EXISTS scores (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        userid      TEXT    NOT NULL UNIQUE,
        firstname   TEXT    DEFAULT '',
        lastname    TEXT    DEFAULT '',
        score       INTEGER NOT NULL,
        created_at  TEXT    DEFAULT (datetime('now')),
        updated_at  TEXT    DEFAULT (datetime('now'))
      );

      CREATE INDEX IF NOT EXISTS idx_scores_score ON scores (score ASC);
    `);
  }
  return _db;
}

export default getDb;
