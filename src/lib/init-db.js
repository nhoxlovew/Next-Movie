// eslint-disable-next-line @typescript-eslint/no-require-imports
const Database = require("better-sqlite3")

// Initialize database
const sqlite = new Database("./auth.db")

console.log("Creating Better Auth tables...")

// Create tables manually for Better Auth
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS user (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    emailVerified INTEGER DEFAULT 0,
    image TEXT,
    createdAt INTEGER DEFAULT (strftime('%s', 'now') * 1000),
    updatedAt INTEGER DEFAULT (strftime('%s', 'now') * 1000)
  )
`)

sqlite.exec(`
  CREATE TABLE IF NOT EXISTS session (
    id TEXT PRIMARY KEY,
    expiresAt INTEGER,
    token TEXT UNIQUE,
    createdAt INTEGER DEFAULT (strftime('%s', 'now') * 1000),
    updatedAt INTEGER DEFAULT (strftime('%s', 'now') * 1000),
    ipAddress TEXT,
    userAgent TEXT,
    userId TEXT REFERENCES user(id) ON DELETE CASCADE
  )
`)

sqlite.exec(`
  CREATE TABLE IF NOT EXISTS account (
    id TEXT PRIMARY KEY,
    accountId TEXT,
    providerId TEXT,
    userId TEXT REFERENCES user(id) ON DELETE CASCADE,
    accessToken TEXT,
    refreshToken TEXT,
    idToken TEXT,
    accessTokenExpiresAt INTEGER,
    refreshTokenExpiresAt INTEGER,
    scope TEXT,
    password TEXT,
    createdAt INTEGER DEFAULT (strftime('%s', 'now') * 1000),
    updatedAt INTEGER DEFAULT (strftime('%s', 'now') * 1000)
  )
`)

sqlite.exec(`
  CREATE TABLE IF NOT EXISTS verification (
    id TEXT PRIMARY KEY,
    identifier TEXT,
    value TEXT,
    expiresAt INTEGER,
    createdAt INTEGER DEFAULT (strftime('%s', 'now') * 1000),
    updatedAt INTEGER DEFAULT (strftime('%s', 'now') * 1000)
  )
`)

console.log("✅ Database tables created successfully!")
console.log("📊 Tables:", sqlite.pragma("table_list").map(t => t.name))

sqlite.close()
