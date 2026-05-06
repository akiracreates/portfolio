#!/usr/bin/env bash
set -euo pipefail

TARGET_BRANCH="dev"
EXPECT=""

usage() {
  cat <<'EOF'
Usage: scripts/verify-merge-state.sh [--branch <name>] [--expect <sha-or-subject-fragment>]

Checks:
  - local branch parity with origin/<branch>
  - optional expected merge commit presence
  - touched files since previous merge commit
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --branch)
      TARGET_BRANCH="${2:-}"
      shift 2
      ;;
    --expect)
      EXPECT="${2:-}"
      shift 2
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      printf '[verify-merge-state][error] unknown argument: %s\n' "$1" >&2
      usage
      exit 2
      ;;
  esac
done

log() {
  printf '[verify-merge-state] %s\n' "$1"
}

err() {
  printf '[verify-merge-state][error] %s\n' "$1" >&2
}

if ! command -v git >/dev/null 2>&1; then
  err "git is required but not found."
  exit 1
fi

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || true)"
if [[ -z "${REPO_ROOT}" ]]; then
  err "not inside a git repository."
  exit 1
fi
cd "${REPO_ROOT}"

log "fetching origin..."
git fetch origin --prune

CURRENT_BRANCH="$(git branch --show-current)"
if [[ "${CURRENT_BRANCH}" != "${TARGET_BRANCH}" ]]; then
  err "current branch is '${CURRENT_BRANCH}', expected '${TARGET_BRANCH}'."
  exit 1
fi

if ! git show-ref --verify --quiet "refs/remotes/origin/${TARGET_BRANCH}"; then
  err "origin/${TARGET_BRANCH} not found."
  exit 1
fi

LOCAL_SHA="$(git rev-parse "${TARGET_BRANCH}")"
REMOTE_SHA="$(git rev-parse "origin/${TARGET_BRANCH}")"
log "local ${TARGET_BRANCH}: ${LOCAL_SHA}"
log "origin/${TARGET_BRANCH}: ${REMOTE_SHA}"

if [[ "${LOCAL_SHA}" != "${REMOTE_SHA}" ]]; then
  err "local ${TARGET_BRANCH} does not match origin/${TARGET_BRANCH}."
  log "run: git pull --ff-only origin ${TARGET_BRANCH}"
  exit 1
fi

log "branch parity check passed."

if [[ -n "${EXPECT}" ]]; then
  if git rev-parse --verify -q "${EXPECT}^{commit}" >/dev/null 2>&1; then
    if git merge-base --is-ancestor "${EXPECT}" "${TARGET_BRANCH}"; then
      log "expected commit '${EXPECT}' is present in ${TARGET_BRANCH}."
    else
      err "expected commit '${EXPECT}' not found in ${TARGET_BRANCH} history."
      exit 1
    fi
  else
    if git log --oneline --grep="${EXPECT}" -n 1 >/dev/null 2>&1; then
      log "found commit subject matching '${EXPECT}'."
    else
      err "no commit subject match found for '${EXPECT}'."
      exit 1
    fi
  fi
fi

LAST_TWO_MERGES="$(git rev-list --merges -n 2 "${TARGET_BRANCH}")"
LAST_MERGE="$(printf '%s\n' "${LAST_TWO_MERGES}" | sed -n '1p')"
PREV_MERGE="$(printf '%s\n' "${LAST_TWO_MERGES}" | sed -n '2p')"

if [[ -n "${LAST_MERGE}" && -n "${PREV_MERGE}" ]]; then
  log "touched files since previous merge:"
  git diff --name-only "${PREV_MERGE}".."${LAST_MERGE}" | sed 's/^/[verify-merge-state]   /'
else
  log "not enough merge commits found to compute touched files since previous merge."
fi

log "runtime reminder: after switching/pulling large frontend changes run:"
log "  rm -rf frontend/.next && (cd frontend && npm run dev)"
log "  then open the exact URL/port printed by Next."

log "verification complete."
