#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage: ./startup.sh [options]

Options:
  -h, --help         Show this help text
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    -h|--help)
      usage
      exit 0
      ;;
    *)
      printf '[startup][error] unknown argument: %s\n' "$1" >&2
      usage
      exit 2
      ;;
  esac
done

log() {
  printf '[startup] %s\n' "$1"
}

warn() {
  printf '[startup][warn] %s\n' "$1"
}

require_cmd() {
  local cmd="$1"
  if ! command -v "${cmd}" >/dev/null 2>&1; then
    printf '[startup][error] required command missing: %s\n' "${cmd}" >&2
    exit 1
  fi
}

require_cmd git
require_cmd node
require_cmd npm

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || true)"
if [[ -z "${REPO_ROOT}" ]]; then
  printf '[startup][error] not inside a git repository.\n' >&2
  exit 1
fi
cd "${REPO_ROOT}"

if [[ -n "$(git status --porcelain)" ]]; then
  warn "working tree has local changes."
fi

log "repository: ${REPO_ROOT}"
CURRENT_BRANCH="$(git branch --show-current)"
if [[ -z "${CURRENT_BRANCH}" ]]; then
  printf '[startup][error] detached HEAD is not supported for startup flow.\n' >&2
  exit 1
fi
log "current branch: ${CURRENT_BRANCH}"
log "latest commit: $(git log --oneline -n 1)"

if [[ "${CURRENT_BRANCH}" == "dev" ]]; then
  log "dev branch detected -> running strict sync + parity verification."
  "${REPO_ROOT}/scripts/sync-dev.sh" "dev"
  log "verifying merge state..."
  "${REPO_ROOT}/scripts/verify-merge-state.sh" --branch dev
else
  log "feature branch detected -> running safe branch-aware checks (no auto checkout/pull)."
  log "fetching origin metadata..."
  git fetch origin --prune
  UPSTREAM="$(git rev-parse --abbrev-ref --symbolic-full-name "@{u}" 2>/dev/null || true)"
  if [[ -n "${UPSTREAM}" ]]; then
    COUNTS="$(git rev-list --left-right --count "${UPSTREAM}...HEAD")"
    BEHIND="$(printf '%s' "${COUNTS}" | awk '{print $1}')"
    AHEAD="$(printf '%s' "${COUNTS}" | awk '{print $2}')"
    log "upstream: ${UPSTREAM} (behind=${BEHIND}, ahead=${AHEAD})"
    if [[ "${BEHIND}" != "0" ]]; then
      warn "your feature branch is behind upstream; consider rebasing/merging before PR."
    fi
  else
    warn "no upstream branch configured for ${CURRENT_BRANCH}; skipping ahead/behind checks."
  fi
fi

FRONTEND_DIR="${REPO_ROOT}/frontend"
if [[ ! -d "${FRONTEND_DIR}" ]]; then
  printf '[startup][error] frontend directory not found at %s\n' "${FRONTEND_DIR}" >&2
  exit 1
fi

cd "${FRONTEND_DIR}"

if [[ ! -d node_modules || package-lock.json -nt node_modules ]]; then
  log "installing/updating npm dependencies..."
  npm install
else
  log "dependencies look up to date."
fi

if [[ -d .next ]]; then
  log "removing frontend/.next for clean build state..."
  rm -rf .next
else
  log "frontend/.next not present; clean state already."
fi

log "starting Next dev server..."
log "use the exact URL/port printed by Next (3000/3001/etc)."
exec npm run dev
