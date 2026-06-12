#!/usr/bin/env bash
# Executar UMA VEZ na VPS (como root ou com sudo).
set -euo pipefail

DEPLOY_PATH="${DEPLOY_PATH:-/var/www/suaarquiteta}"
DEPLOY_USER="${DEPLOY_USER:-deploy}"

echo "==> Instalando dependências do sistema..."
apt-get update
apt-get install -y curl git nginx certbot python3-certbot-nginx ufw

if ! command -v node >/dev/null 2>&1; then
  echo "==> Instalando Node.js 20..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi

if ! command -v pm2 >/dev/null 2>&1; then
  echo "==> Instalando PM2..."
  npm install -g pm2
  pm2 startup systemd -u "${DEPLOY_USER}" --hp "/home/${DEPLOY_USER}" || true
fi

echo "==> Criando usuário de deploy (se não existir)..."
if ! id "${DEPLOY_USER}" >/dev/null 2>&1; then
  adduser --disabled-password --gecos "" "${DEPLOY_USER}"
fi

echo "==> Preparando diretório da aplicação..."
mkdir -p "${DEPLOY_PATH}"
chown -R "${DEPLOY_USER}:${DEPLOY_USER}" "${DEPLOY_PATH}"

echo "==> Configurando firewall básico..."
ufw allow OpenSSH
ufw allow "Nginx Full"
ufw --force enable

echo "==> Setup concluído."
echo "Próximos passos:"
echo "1) Configure o Nginx com deploy/nginx-suaarquiteta.conf"
echo "2) Rode: sudo certbot --nginx -d suaarquiteta.com -d www.suaarquiteta.com"
echo "3) Adicione a chave SSH pública do GitHub Actions em /home/${DEPLOY_USER}/.ssh/authorized_keys"
echo "4) Faça o primeiro deploy via GitHub Actions (push na branch main)"
