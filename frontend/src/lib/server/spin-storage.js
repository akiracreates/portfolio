import { Redis } from "@upstash/redis";

const SPIN_KEY_PREFIX = "spinwheel:record:";
const SPIN_PENDING_PREFIX = "spinwheel:pending:";
const SPIN_RATE_PREFIX = "spinwheel:rate:";
const PENDING_TTL_SECONDS = 10 * 60;

let redisSingleton = null;

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  if (!redisSingleton) {
    redisSingleton = new Redis({ url, token });
  }
  return redisSingleton;
}

export function isSpinStorageConfigured() {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
  );
}

function spinKey(normalizedEmail) {
  return `${SPIN_KEY_PREFIX}${normalizedEmail}`;
}

function pendingKey(normalizedEmail) {
  return `${SPIN_PENDING_PREFIX}${normalizedEmail}`;
}

function rateKey(kind, key) {
  return `${SPIN_RATE_PREFIX}${kind}:${key}`;
}

function coerceRecord(raw) {
  if (raw == null) return null;
  if (typeof raw === "object") return raw;
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  return null;
}

function coercePending(raw) {
  return coerceRecord(raw);
}

/**
 * @param {string} normalizedEmail
 * @returns {Promise<object | null>}
 */
export async function getSpinRecord(normalizedEmail) {
  const r = getRedis();
  if (!r) {
    throw new Error("spin_storage_not_configured");
  }
  const data = await r.get(spinKey(normalizedEmail));
  return coerceRecord(data);
}

/**
 * Create record only if missing (Redis SETNX). Returns existing record if present.
 * @param {string} normalizedEmail
 * @param {object} record
 * @returns {Promise<{ created: boolean, record: object | null }>}
 */
export async function claimSpinRecord(normalizedEmail, record) {
  const r = getRedis();
  if (!r) {
    throw new Error("spin_storage_not_configured");
  }
  const key = spinKey(normalizedEmail);
  const inserted = await r.setnx(key, record);
  if (!inserted) {
    const existing = await r.get(key);
    return { created: false, record: coerceRecord(existing) };
  }
  return { created: true, record };
}

/**
 * @param {string} normalizedEmail
 * @returns {Promise<object | null>}
 */
export async function getPendingSpin(normalizedEmail) {
  const r = getRedis();
  if (!r) {
    throw new Error("spin_storage_not_configured");
  }
  const data = await r.get(pendingKey(normalizedEmail));
  return coercePending(data);
}

/**
 * @param {string} normalizedEmail
 * @param {object} pending
 */
export async function setPendingSpin(normalizedEmail, pending) {
  const r = getRedis();
  if (!r) {
    throw new Error("spin_storage_not_configured");
  }
  await r.set(pendingKey(normalizedEmail), pending, { ex: PENDING_TTL_SECONDS });
}

/**
 * @param {string} normalizedEmail
 */
export async function clearPendingSpin(normalizedEmail) {
  const r = getRedis();
  if (!r) {
    throw new Error("spin_storage_not_configured");
  }
  await r.del(pendingKey(normalizedEmail));
}

/**
 * Atomic-ish request limiter with fixed window.
 * @param {'email'|'ip'} kind
 * @param {string} key
 * @param {number} limit
 * @param {number} windowSeconds
 */
export async function consumeSpinRateLimit(kind, key, limit, windowSeconds) {
  const r = getRedis();
  if (!r) {
    throw new Error("spin_storage_not_configured");
  }
  const fullKey = rateKey(kind, key);
  const count = await r.incr(fullKey);
  if (count === 1) {
    await r.expire(fullKey, windowSeconds);
  }
  return {
    allowed: count <= limit,
    count,
    limit,
    windowSeconds,
  };
}
