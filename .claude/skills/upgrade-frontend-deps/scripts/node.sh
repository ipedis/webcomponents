#!/usr/bin/env bash
# Run a command at the repository root with the Node version pinned in .nvmrc (through nvm), so the upgrade never
# runs on whatever Node the shell happens to have.
#
# Usage: node.sh <command...>     e.g. node.sh npm outdated, node.sh npx nx migrate latest
#        node.sh check            lint + unit tests + e2e + build, without the Nx cache
#        node.sh                  interactive shell
#        RESET=1 node.sh ...      delete node_modules and run npm ci first, like CI
set -euo pipefail

ROOT=$(git rev-parse --show-toplevel)
cd "$ROOT"

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
set +u
# shellcheck source=/dev/null
. "$NVM_DIR/nvm.sh"
nvm use --silent >/dev/null
set -u

expected="v$(tr -d '[:space:]' < .nvmrc)"
if [[ "$(node -v)" != "$expected" ]]; then
  echo "Node $(node -v) is active, $expected expected: run nvm install" >&2
  exit 1
fi

if [[ "${RESET:-0}" == 1 ]]; then
  rm -rf node_modules
  npm ci
fi

if [[ "${1:-}" == check ]]; then
  export NX_SKIP_NX_CACHE=true
  set -- sh -c 'npm run lint && npm run test && npm run e2e && npm run build'
elif [[ $# -eq 0 ]]; then
  set -- "${SHELL:-sh}"
fi

exec "$@"
