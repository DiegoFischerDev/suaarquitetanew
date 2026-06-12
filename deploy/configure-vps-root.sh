#!/usr/bin/env bash
# Setup seguro para VPS com MÚLTIPLOS projetos — instala só o suaarquiteta.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=project.config.sh
source "${SCRIPT_DIR}/project.config.sh"

REPO_URL="${REPO_URL:-https://github.com/DiegoFischerDev/suaarquitetanew.git}"
TMP_DIR="$(mktemp -d)"

cleanup() { rm -rf "${TMP_DIR}"; }
trap cleanup EXIT

echo "================================================"
echo " Setup isolado: ${PROJECT_NAME}"
echo " Domínio: ${PROJECT_DOMAIN}"
echo " Porta: ${PROJECT_PORT} (não usa 3000)"
echo " Pasta: ${PROJECT_DEPLOY_PATH}"
echo "================================================"
echo ""
echo "Este script NÃO remove outros sites Nginx nem outros apps PM2."
echo ""

git clone --depth 1 "${REPO_URL}" "${TMP_DIR}/repo"
bash "${TMP_DIR}/repo/deploy/install-app-deps.sh"
bash "${TMP_DIR}/repo/deploy/install-nginx-site.sh"

echo ""
echo "✓ Setup concluído sem afetar outros projetos."
echo ""
echo "Próximos passos:"
echo "  1) DNS: ${PROJECT_DOMAIN} e ${PROJECT_WWW} → IP da VPS"
echo "  2) Chave SSH do GitHub Actions em /root/.ssh/authorized_keys"
echo "  3) Secrets: VPS_HOST, VPS_USER=root, VPS_SSH_KEY, VPS_PORT=22"
echo "     VPS_DEPLOY_PATH=${PROJECT_DEPLOY_PATH}, VPS_APP_PORT=${PROJECT_PORT}"
echo "  4) git push na main → deploy automático"
echo "  5) SSL: certbot --nginx -d ${PROJECT_DOMAIN} -d ${PROJECT_WWW}"
