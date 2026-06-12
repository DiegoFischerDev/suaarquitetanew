# Deploy — GitHub + Hostinger VPS + suaarquiteta.com

Guia passo a passo para publicar o projeto **Sua Arquiteta** na VPS da Hostinger com deploy automático via GitHub Actions.

---

## Visão geral

```
Seu Mac  →  git push  →  GitHub  →  GitHub Actions  →  VPS Hostinger  →  Nginx  →  suaarquiteta.com
```

- **Build** roda no GitHub Actions (não sobrecarrega a VPS)
- **Artefato** enviado por SSH (modo `standalone` do Next.js)
- **PM2** mantém o app no ar
- **Nginx** expõe o domínio na porta 80/443

---

## Pré-requisitos

- [ ] Conta no [GitHub](https://github.com)
- [ ] VPS Hostinger com acesso SSH (IP, usuário e senha/chave)
- [ ] Domínio `suaarquiteta.com` na Hostinger
- [ ] Git instalado no Mac (`git --version`)

---

## Parte 1 — Criar o repositório no GitHub

### 1.1 Criar repo vazio

1. Acesse [github.com/new](https://github.com/new)
2. **Repository name:** `suaarquiteta` (ou outro nome)
3. **Visibility:** Private (recomendado) ou Public
4. **Não** marque README, .gitignore nem license (o projeto já existe localmente)
5. Clique em **Create repository**

Anote a URL do repo, por exemplo:
`https://github.com/SEU-USUARIO/suaarquiteta.git`

### 1.2 Enviar o projeto do Mac para o GitHub

No terminal, dentro da pasta do projeto:

```bash
cd "/Users/rafasilva/Desktop/Diego/Projetos/suaarquiteta2026/suaarquitetanew"

# Confira se está tudo commitado
git status

# Se houver alterações pendentes, commite antes
git add .
git commit -m "Preparar deploy Hostinger com GitHub Actions"

# Conecte ao GitHub (troque SEU-USUARIO e o nome do repo)
git remote add origin https://github.com/SEU-USUARIO/suaarquiteta.git

# Envie para a branch main
git branch -M main
git push -u origin main
```

> **Autenticação:** o GitHub não aceita mais senha no `git push`. Use **Personal Access Token** (Settings → Developer settings → Tokens) ou configure **SSH**.

---

## Parte 2 — Preparar a VPS (uma vez)

### 2.1 Conectar na VPS

No painel Hostinger → VPS → copie o **IP** e acesse via SSH:

```bash
ssh root@SEU_IP_DA_VPS
```

> Se a Hostinger forneceu outro usuário (ex.: `ubuntu`), use esse usuário.

### 2.2 Rodar script de setup

Na VPS, copie e execute o setup (ou rode linha a linha):

```bash
# Opção A: clonar o repo temporariamente só para pegar o script
apt-get update && apt-get install -y git
git clone https://github.com/SEU-USUARIO/suaarquiteta.git /tmp/suaarquiteta
bash /tmp/suaarquiteta/deploy/setup-vps.sh
```

O script instala: **Node.js 20**, **PM2**, **Nginx**, **Certbot** e **UFW**.

### 2.3 Criar usuário de deploy (recomendado)

```bash
adduser deploy
usermod -aG sudo deploy
mkdir -p /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
```

### 2.4 Gerar chave SSH para o GitHub Actions

**No seu Mac** (não na VPS):

```bash
ssh-keygen -t ed25519 -C "github-actions-suaarquiteta" -f ~/.ssh/suaarquiteta_deploy -N ""
```

Isso gera:
- `~/.ssh/suaarquiteta_deploy` → chave **privada** (vai para o GitHub Secrets)
- `~/.ssh/suaarquiteta_deploy.pub` → chave **pública** (vai para a VPS)

**Na VPS**, adicione a chave pública:

```bash
# No Mac, copie a chave pública:
cat ~/.ssh/suaarquiteta_deploy.pub

# Na VPS, cole em authorized_keys do usuário deploy:
nano /home/deploy/.ssh/authorized_keys
# cole a linha inteira, salve

chown -R deploy:deploy /home/deploy/.ssh
chmod 600 /home/deploy/.ssh/authorized_keys
```

Teste do Mac:

```bash
ssh -i ~/.ssh/suaarquiteta_deploy deploy@SEU_IP_DA_VPS
```

### 2.5 Configurar Nginx

Na VPS:

```bash
sudo cp /tmp/suaarquiteta/deploy/nginx-suaarquiteta.conf /etc/nginx/sites-available/suaarquiteta
sudo ln -sf /etc/nginx/sites-available/suaarquiteta /etc/nginx/sites-enabled/suaarquiteta
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

### 2.6 Permissão do diretório de deploy

```bash
sudo mkdir -p /var/www/suaarquiteta
sudo chown -R deploy:deploy /var/www/suaarquiteta
```

---

## Parte 3 — DNS do domínio (Hostinger)

No painel Hostinger → **Domínios** → `suaarquiteta.com` → **DNS / Zona DNS**:

| Tipo | Nome | Valor        | TTL |
|------|------|--------------|-----|
| A    | @    | SEU_IP_DA_VPS | 3600 |
| A    | www  | SEU_IP_DA_VPS | 3600 |

Remova registros A antigos que apontem para outro servidor.

Aguarde a propagação (5 min a 48 h). Teste:

```bash
dig suaarquiteta.com +short
```

---

## Parte 4 — Secrets no GitHub

No repositório GitHub → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Crie estes secrets:

| Secret | Exemplo | Descrição |
|--------|---------|-----------|
| `VPS_HOST` | `123.45.67.89` | IP da VPS |
| `VPS_USER` | `deploy` | Usuário SSH |
| `VPS_SSH_KEY` | conteúdo de `~/.ssh/suaarquiteta_deploy` | Chave privada **inteira** (incluindo `BEGIN`/`END`) |
| `VPS_PORT` | `22` | Porta SSH |
| `VPS_DEPLOY_PATH` | `/var/www/suaarquiteta` | Pasta onde o app roda |

Para copiar a chave privada no Mac:

```bash
cat ~/.ssh/suaarquiteta_deploy
```

> **Importante:** nunca commite a chave privada no repositório.

### Environment (opcional, recomendado)

Settings → Environments → **New environment** → nome: `production`

O workflow já usa `environment: production`. Você pode restringir deploys só à branch `main`.

---

## Parte 5 — Primeiro deploy

### 5.1 Disparar o pipeline

Qualquer push na branch `main` dispara o deploy:

```bash
git add .
git commit -m "Configurar pipeline de deploy"
git push origin main
```

### 5.2 Acompanhar

GitHub → aba **Actions** → workflow **Deploy to Hostinger VPS**

Se falhar, abra o job e leia o log (erros comuns: SSH, permissão de pasta, Node).

### 5.3 Verificar na VPS

```bash
ssh deploy@SEU_IP_DA_VPS
pm2 status
pm2 logs suaarquiteta --lines 50
curl -I http://127.0.0.1:3000
```

---

## Parte 6 — HTTPS (SSL gratuito)

Com o DNS apontando para a VPS e o site respondendo em HTTP:

```bash
sudo certbot --nginx -d suaarquiteta.com -d www.suaarquiteta.com
```

Siga o assistente (e-mail, aceitar termos). O Certbot configura HTTPS automaticamente.

Renovação automática:

```bash
sudo certbot renew --dry-run
```

---

## Parte 7 — Checklist pós-deploy

- [ ] `https://suaarquiteta.com` abre o site
- [ ] `https://www.suaarquiteta.com` redireciona ou abre igual
- [ ] Imagens e vídeo da seção Especialidades carregam
- [ ] WhatsApp e links funcionam
- [ ] `pm2 status` mostra `suaarquiteta` online
- [ ] GitHub Actions verde no último push

---

## Fluxo do dia a dia

```bash
# 1. Desenvolva localmente
npm run dev

# 2. Commit e push
git add .
git commit -m "Sua alteração"
git push origin main

# 3. GitHub Actions faz build + deploy automaticamente (~2-5 min)
```

---

## Solução de problemas

### Deploy falha no SSH
- Confira `VPS_HOST`, `VPS_USER`, `VPS_PORT`
- Teste manual: `ssh -i ~/.ssh/suaarquiteta_deploy deploy@IP`
- Chave pública está em `/home/deploy/.ssh/authorized_keys`?

### Site não abre no domínio
- DNS propagou? `dig suaarquiteta.com`
- Nginx rodando? `sudo systemctl status nginx`
- App rodando? `pm2 status`

### Erro 502 Bad Gateway
- App caiu: `pm2 logs suaarquiteta`
- Porta 3000 em uso? `ss -tlnp | grep 3000`

### Build falha no GitHub Actions
- Rode local: `npm ci && npm run build`
- Verifique versão Node (`.nvmrc` = 20)

### Pasta de deploy diferente de `/var/www/suaarquiteta`
- Atualize o secret `VPS_DEPLOY_PATH`
- Edite `deploy/ecosystem.config.cjs` → campo `cwd` com o mesmo caminho

---

## Arquivos de deploy no projeto

| Arquivo | Função |
|---------|--------|
| `.github/workflows/deploy.yml` | Pipeline CI/CD |
| `deploy/setup-vps.sh` | Setup inicial da VPS |
| `deploy/nginx-suaarquiteta.conf` | Proxy reverso Nginx |
| `deploy/ecosystem.config.cjs` | Configuração PM2 |
| `next.config.ts` | `output: "standalone"` para VPS |

---

## Observações

- O vídeo `public/videos/services.mp4` **precisa estar no Git** para funcionar em produção.
- A URL canônica do site foi configurada para `https://suaarquiteta.com` em `src/lib/site.ts`, `sitemap.xml` e `robots.txt`.
- O arquivo `.MOV` original (~28 MB) pode ser removido do repo depois se quiser reduzir tamanho — o site usa apenas o `.mp4`.
