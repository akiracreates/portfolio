#!/usr/bin/env node
/**
 * Build-time helper: probes each ImageKit image referenced in
 * `src/lib/content/artworks.js` and writes its natural width/height into
 * `src/lib/images/image-meta.json`.
 *
 * - Reads the public ImageKit endpoint from `.env`
 *   (NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT, falls back to VITE_IMAGEKIT_URL_ENDPOINT).
 * - Caches: skips paths already present in the JSON unless `--force` is passed.
 * - Skips paths that aren't ImageKit URLs (e.g. picsum placeholders).
 *
 * Run via `predev` / `prebuild` npm scripts.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import probe from "probe-image-size";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FRONTEND_ROOT = resolve(__dirname, "..");
const ARTWORKS_PATH = resolve(FRONTEND_ROOT, "src/lib/content/artworks.js");
const META_OUT_PATH = resolve(FRONTEND_ROOT, "src/lib/images/image-meta.json");
const ENV_PATH = resolve(FRONTEND_ROOT, ".env");

const FORCE = process.argv.includes("--force");

function loadEnv() {
  if (!existsSync(ENV_PATH)) return;
  const text = readFileSync(ENV_PATH, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

function getEndpoint() {
  const ep =
    process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT ||
    process.env.VITE_IMAGEKIT_URL_ENDPOINT ||
    "";
  return ep.replace(/\/+$/, "");
}

function extractImageKitPaths(text) {
  // Matches:
  //   imagekitUrl("images/foo/bar")
  //   path: "images/foo/bar"
  // so we keep working whether artworks.js stores raw paths or wraps them.
  const found = new Set();
  const patterns = [
    /imagekitUrl\(\s*["']([^"']+)["']\s*\)/g,
    /\bpath\s*:\s*["'](images\/[^"']+)["']/g,
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(text))) found.add(m[1]);
  }
  return [...found];
}

async function main() {
  loadEnv();
  const endpoint = getEndpoint();
  if (!endpoint) {
    console.error(
      "[image-meta] NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT (or VITE_IMAGEKIT_URL_ENDPOINT) is not set; skipping.",
    );
    return;
  }

  const artworks = readFileSync(ARTWORKS_PATH, "utf8");
  const paths = extractImageKitPaths(artworks);

  if (!existsSync(dirname(META_OUT_PATH))) {
    mkdirSync(dirname(META_OUT_PATH), { recursive: true });
  }

  let cache = {};
  if (existsSync(META_OUT_PATH)) {
    try {
      cache = JSON.parse(readFileSync(META_OUT_PATH, "utf8"));
    } catch {
      cache = {};
    }
  }

  const todo = FORCE ? paths : paths.filter((p) => !cache[p]);
  if (todo.length === 0) {
    console.log(
      `[image-meta] cache up to date (${paths.length} paths, 0 to fetch).`,
    );
    return;
  }

  console.log(
    `[image-meta] probing ${todo.length}/${paths.length} ImageKit images...`,
  );

  const results = await Promise.allSettled(
    todo.map(async (path) => {
      const url = `${endpoint}/${encodeURI(path)}`;
      const res = await probe(url);
      return [path, { width: res.width, height: res.height }];
    }),
  );

  let okCount = 0;
  for (const r of results) {
    if (r.status === "fulfilled") {
      const [p, meta] = r.value;
      cache[p] = meta;
      okCount += 1;
    } else {
      console.warn(
        `[image-meta] failed to probe an image: ${r.reason?.message || r.reason}`,
      );
    }
  }

  const sortedKeys = Object.keys(cache).sort();
  const sortedCache = {};
  for (const k of sortedKeys) sortedCache[k] = cache[k];

  writeFileSync(META_OUT_PATH, JSON.stringify(sortedCache, null, 2) + "\n");
  console.log(
    `[image-meta] wrote ${okCount} new entries to ${META_OUT_PATH} (total: ${sortedKeys.length}).`,
  );
}

main().catch((err) => {
  console.error("[image-meta] script failed:", err);
  process.exitCode = 1;
});
