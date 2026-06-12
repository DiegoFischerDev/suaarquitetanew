#!/usr/bin/env bash
# Wrapper legado — use os scripts isolados em VPS com vários projetos.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "VPS com outros projetos? Use os scripts isolados:"
echo "  bash deploy/install-app-deps.sh"
echo "  bash deploy/install-nginx-site.sh"
echo ""

bash "${SCRIPT_DIR}/install-app-deps.sh"
bash "${SCRIPT_DIR}/install-nginx-site.sh"
