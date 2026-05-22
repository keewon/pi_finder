CREATE TABLE IF NOT EXISTS records (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  uid         TEXT    NOT NULL,
  name        TEXT    NOT NULL,
  digits      INTEGER NOT NULL,
  time        INTEGER NOT NULL,
  continues   INTEGER NOT NULL DEFAULT 0,
  const_key   TEXT    NOT NULL,
  suspicious  INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_const_digits  ON records (const_key, digits DESC);
CREATE INDEX IF NOT EXISTS idx_const_created ON records (const_key, created_at);
CREATE INDEX IF NOT EXISTS idx_uid           ON records (uid);
