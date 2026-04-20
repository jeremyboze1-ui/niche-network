import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';

let _db: Database.Database | null = null;

/**
 * Returns a singleton better-sqlite3 database instance.
 * The DB file is created on first use and tables are initialized on boot.
 */
export function getDb(): Database.Database {
  if (_db) return _db;

  const dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), 'data', 'niche-network.db');
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  // --- Schema ---
  db.exec(`
    CREATE TABLE IF NOT EXISTS subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      source TEXT DEFAULT 'landing',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS videos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      url TEXT NOT NULL,
      thumbnail_url TEXT,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      expires_at TEXT NOT NULL
    );
  `);

  _db = db;
  return db;
}

// --- Subscribers ---
export interface Subscriber {
  id: number;
  email: string;
  source: string;
  created_at: string;
}

export function addSubscriber(email: string, source = 'landing'): { ok: boolean; duplicate?: boolean } {
  const db = getDb();
  try {
    db.prepare('INSERT INTO subscribers (email, source) VALUES (?, ?)').run(email.toLowerCase().trim(), source);
    return { ok: true };
  } catch (err: any) {
    if (err?.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return { ok: true, duplicate: true };
    }
    throw err;
  }
}

export function listSubscribers(): Subscriber[] {
  const db = getDb();
  return db.prepare('SELECT id, email, source, created_at FROM subscribers ORDER BY created_at DESC').all() as Subscriber[];
}

export function countSubscribers(): number {
  const db = getDb();
  const row = db.prepare('SELECT COUNT(*) as c FROM subscribers').get() as { c: number };
  return row.c;
}

// --- Videos ---
export interface Video {
  id: number;
  title: string;
  description: string | null;
  url: string;
  thumbnail_url: string | null;
  sort_order: number;
  created_at: string;
}

export function listVideos(): Video[] {
  const db = getDb();
  return db.prepare('SELECT * FROM videos ORDER BY sort_order ASC, created_at DESC').all() as Video[];
}

export function addVideo(input: { title: string; description?: string; url: string; thumbnail_url?: string }): Video {
  const db = getDb();
  const info = db.prepare(
    'INSERT INTO videos (title, description, url, thumbnail_url) VALUES (?, ?, ?, ?)'
  ).run(input.title, input.description ?? null, input.url, input.thumbnail_url ?? null);
  return db.prepare('SELECT * FROM videos WHERE id = ?').get(info.lastInsertRowid) as Video;
}

export function deleteVideo(id: number): boolean {
  const db = getDb();
  const info = db.prepare('DELETE FROM videos WHERE id = ?').run(id);
  return info.changes > 0;
}

// --- Sessions ---
export function createSessionRow(id: string, ttlMs: number) {
  const db = getDb();
  const expires = new Date(Date.now() + ttlMs).toISOString();
  db.prepare('INSERT INTO sessions (id, expires_at) VALUES (?, ?)').run(id, expires);
}

export function isSessionValid(id: string): boolean {
  const db = getDb();
  const row = db.prepare('SELECT expires_at FROM sessions WHERE id = ?').get(id) as { expires_at: string } | undefined;
  if (!row) return false;
  return new Date(row.expires_at).getTime() > Date.now();
}

export function destroySession(id: string) {
  const db = getDb();
  db.prepare('DELETE FROM sessions WHERE id = ?').run(id);
}
