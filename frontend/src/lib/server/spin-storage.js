import { Redis } from "@upstash/redis";

const SPIN_KEY_PREFIX = "spinwheel:record:";

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
