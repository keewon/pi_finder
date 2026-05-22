export interface Env {
  DB: D1Database;
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const VALID_CONST_KEYS = new Set(['pi', 'e', 'sqrt2', 'phi']);
const VALID_PERIODS = new Set(['all', 'weekly', 'monthly']);
const SUSPICIOUS_DIGITS_PER_SEC = 8;
const RATE_LIMIT_PER_DAY = 20;

interface RecordRow {
  id: number;
  uid: string;
  name: string;
  digits: number;
  time: number;
  continues: number;
  const_key: string;
  suspicious: number;
  created_at: string;
}

function json(data: unknown, status = 200): Response {
  return Response.json(data, { status, headers: CORS_HEADERS });
}

function isSuspicious(digits: number, time: number): boolean {
  return time > 0 && digits / time > SUSPICIOUS_DIGITS_PER_SEC;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    try {
      if (path === '/records') {
        if (request.method === 'POST') return handleCreate(request, env);
        if (request.method === 'GET')  return handleList(url, env);
      }

      const deleteMatch = path.match(/^\/records\/(\d+)$/);
      if (deleteMatch && request.method === 'DELETE') {
        return handleDelete(url, env, parseInt(deleteMatch[1]));
      }

      return json({ error: 'Not Found' }, 404);
    } catch {
      return json({ error: 'Internal Server Error' }, 500);
    }
  },
};

async function handleCreate(request: Request, env: Env): Promise<Response> {
  const body = await request.json() as Record<string, unknown>;
  const { uid, name, digits, time, continues, constKey } = body;

  if (typeof uid !== 'string' || uid.length < 1 || uid.length > 64)
    return json({ error: 'Invalid uid' }, 400);
  if (typeof name !== 'string' || name.length < 1 || name.length > 50)
    return json({ error: 'Invalid name' }, 400);
  if (typeof digits !== 'number' || digits < 1 || digits > 1000)
    return json({ error: 'Invalid digits' }, 400);
  if (typeof time !== 'number' || time < 1)
    return json({ error: 'Invalid time' }, 400);
  if (typeof continues !== 'number' || continues < 0)
    return json({ error: 'Invalid continues' }, 400);
  if (typeof constKey !== 'string' || !VALID_CONST_KEYS.has(constKey))
    return json({ error: 'Invalid constKey' }, 400);

  // 하루 제출 횟수 제한
  const rateRow = await env.DB.prepare(
    `SELECT COUNT(*) as count FROM records WHERE uid = ? AND created_at >= datetime('now', '-1 day')`
  ).bind(uid).first<{ count: number }>();

  if ((rateRow?.count ?? 0) >= RATE_LIMIT_PER_DAY) {
    return json({ error: 'Rate limit exceeded' }, 429);
  }

  // suspicious 서버에서 계산
  const suspicious = isSuspicious(digits, time) ? 1 : 0;

  const result = await env.DB.prepare(
    `INSERT INTO records (uid, name, digits, time, continues, const_key, suspicious)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).bind(uid, name, digits, time, continues, constKey, suspicious).run();

  return json({ id: result.meta.last_row_id, suspicious: suspicious === 1 }, 201);
}

async function handleList(url: URL, env: Env): Promise<Response> {
  const constKey = url.searchParams.get('constKey') ?? 'pi';
  const period   = url.searchParams.get('period')   ?? 'all';
  const uid      = url.searchParams.get('uid')      ?? '';
  const limit    = Math.min(parseInt(url.searchParams.get('limit') ?? '50'), 100);

  if (!VALID_CONST_KEYS.has(constKey)) return json({ error: 'Invalid constKey' }, 400);
  if (!VALID_PERIODS.has(period))      return json({ error: 'Invalid period' }, 400);

  let dateCondition = '';
  if (period === 'weekly')  dateCondition = `AND created_at >= datetime('now', '-7 days')`;
  if (period === 'monthly') dateCondition = `AND created_at >= datetime('now', '-30 days')`;

  const { results } = await env.DB.prepare(
    `SELECT id, uid, name, digits, time, continues, const_key, suspicious, created_at
     FROM records
     WHERE const_key = ?
       AND suspicious = 0
       ${dateCondition}
     ORDER BY digits DESC, time ASC
     LIMIT ?`
  ).bind(constKey, limit).all<RecordRow>();

  return json(results);
}

async function handleDelete(url: URL, env: Env, id: number): Promise<Response> {
  const uid = url.searchParams.get('uid') ?? '';
  if (!uid) return json({ error: 'Missing uid' }, 400);

  const result = await env.DB.prepare(
    `DELETE FROM records WHERE id = ? AND uid = ?`
  ).bind(id, uid).run();

  if (result.meta.changes === 0) return json({ error: 'Not found or not yours' }, 404);
  return json({ success: true });
}
