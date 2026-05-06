#!/usr/bin/env bash
set -euo pipefail

TARGET_BRANCH="${1:-dev}"

log() {
  printf '[sync-dev] %s\n' "$1"
}

warn() {
  printf '[sync-dev][warn] %s\n' "$1"
}

if ! command -v git >/dev/null 2>&1; then
  printf '[sync-dev][error] git is required but not found.\n' >&2
  exit 1
fi

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || true)"
if [[ -z "${REPO_ROOT}" ]]; then
  printf '[sync-dev][error] not inside a git repository.\n' >&2
  exit 1
fi

cd "${REPO_ROOT}"

if [[ -n "$(git status --porcelain)" ]]; then
  warn "working tree is dirty; pull may fail or require manual resolution."
fi

log "fetching origin..."
git fetch origin --prune

CURRENT_BRANCH="$(git branch --show-current)"
if [[ "${CURRENT_BRANCH}" != "${TARGET_BRANCH}" ]]; then
  log "checking out ${TARGET_BRANCH}..."
  git checkout "${TARGET_BRANCH}"
fi

log "pulling origin/${TARGET_BRANCH}..."
git pull --ff-only origin "${TARGET_BRANCH}"

log "branch status:"
git status -sb

log "ahead/behind:"
git rev-list --left-right --count "origin/${TARGET_BRANCH}...${TARGET_BRANCH}" | awk '{printf "[sync-dev] behind=%s ahead=%s\n",$1,$2}'

log "latest commits:"
git log --oneline -n 5 | sed 's/^/[sync-dev] /'

log "sync complete."
