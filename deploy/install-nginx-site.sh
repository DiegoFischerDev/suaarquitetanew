#!/usr/bin/env bash
# Instala APENAS o virtual host do suaarquiteta.com — não remove outros sites.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=project.config.sh
source "${SCRIPT_DIR}/project.config.sh"

NGINX_AVAILABLE="/etc/nginx/sites-available/${PROJECT_NAME}"
NGINX_ENABLED="/etc/nginx/sites-enabled/${PROJECT_NAME}"
TEMPLATE="${SCRIPT_DIR}/nginx-suaarquiteta.conf"

if [ ! -f "${TEMPLATE}" ]; then
  echo "Erro: template nginx não encontrado em ${TEMPLATE}"
  exit 1
fi

if ss -tlnp | grep -q ":${PROJECT_PORT} "; then
  OWNER="$(ss -tlnp | grep ":${PROJECT_PORT} " || true)"
  if ! echo "${OWNER}" | grep -q "${PROJECT_PM2_NAME}\|${PROJECT_DEPLOY_PATH}"; then
    echo "AVISO: a porta ${PROJECT_PORT} já está em uso por outro processo:"
    echo "${OWNER}"
    echo "Escolha outra porta em deploy/project.config.sh antes de continuar."
    exit 1
  fi
fi

echo "==> Instalando site Nginx: ${PROJECT_DOMAIN} → 127.0.0.1:${PROJECT_PORT}"
cp "${TEMPLATE}" "${NGINX_AVAILABLE}"
ln -sf "${NGINX_AVAILABLE}" "${NGINX_ENABLED}"

echo "==> Validando configuração global do Nginx (todos os sites)..."
nginx -t

echo "==> Recarregando Nginx (sem derrubar conexões ativas)..."
systemctl reload nginx

echo "✓ Site ${PROJECT_NAME} instalado."
echo "  Domínio: ${PROJECT_DOMAIN}, ${PROJECT_WWW}"
echo "  Porta interna: ${PROJECT_PORT}"
echo "  Logs: /var/log/nginx/${PROJECT_NAME}.*.log"
