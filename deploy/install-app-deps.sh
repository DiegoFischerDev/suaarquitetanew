#!/usr/bin/env bash
# Instala Node/PM2 e cria pasta do projeto — não altera Nginx nem outros apps.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=project.config.sh
source "${SCRIPT_DIR}/project.config.sh"

echo "==> Verificando Node.js..."
if ! command -v node >/dev/null 2>&1; then
  export DEBIAN_FRONTEND=noninteractive
  apt-get update
  apt-get install -y curl
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
else
  echo "Node já instalado: $(node -v)"
fi

echo "==> Verificando PM2..."
if ! command -v pm2 >/dev/null 2>&1; then
  npm install -g pm2
  pm2 startup systemd -u root --hp /root || true
else
  echo "PM2 já instalado."
fi

echo "==> Criando pasta isolada do projeto..."
mkdir -p "${PROJECT_DEPLOY_PATH}"

echo "✓ Dependências prontas para ${PROJECT_NAME}."
echo "  Pasta: ${PROJECT_DEPLOY_PATH}"
echo "  Porta reservada: ${PROJECT_PORT}"
