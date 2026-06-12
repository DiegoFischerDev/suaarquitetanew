# VPS com vários projetos — organização

Este servidor já hospeda outros sites. O **suaarquiteta** foi configurado para **não misturar** com eles

---

## Regra de ouro

Cada projeto = **4 coisas isoladas**:

| Recurso | suaarquiteta | Outro projeto (exemplo) |
|---------|--------------|-------------------------|
| Pasta | `/var/www/suaarquiteta` | `/var/www/outro-site` |
| Porta Node | `3010` | `3011`, `3020`, etc. |
| Nginx | `/etc/nginx/sites-available/suaarquiteta` | arquivo próprio |
| PM2 | app `suaarquiteta` | app com outro nome |

O Nginx roteia por **domínio** (`server_name`). Vários sites na porta 80/443 coexistem sem conflito.

---

## Mapa de portas (atualizar ao adicionar projetos)

| Projeto | Domínio | Porta | PM2 | Pasta |
|---------|---------|-------|-----|-------|
| suaarquiteta | suaarquiteta.com | **3010** | suaarquiteta | /var/www/suaarquiteta |
| _(seus outros)_ | _(domínios)_ | _(anotar)_ | _(nome pm2)_ | /var/www/... |

Antes de subir um projeto novo, verifique portas livres na VPS:

```bash
ss -tlnp | grep -E ':(30[0-9]{2}|301[0-9]) '
pm2 list
ls /etc/nginx/sites-enabled/
```

---

## O que NÃO fazemos (para proteger outros sites)

- Não removemos `/etc/nginx/sites-enabled/default`
- Não sobrescrevemos configs de outros domínios
- Não usamos porta `3000` (muito comum em outros apps Node)
- Não rodamos `pm2 delete all` nem `pm2 restart all`
- Deploy só toca o app `suaarquiteta` (`pm2 reload --only suaarquiteta`)

---

## Instalação segura na VPS (já com outros projetos)

```bash
ssh root@72.60.45.216

# Clone temporário só para pegar os scripts
git clone https://github.com/DiegoFischerDev/suaarquitetanew.git /tmp/suaarquitetanew
cd /tmp/suaarquitetanew

# 1) Node/PM2 + pasta (não mexe no Nginx dos outros)
bash deploy/install-app-deps.sh

# 2) Só adiciona o virtual host suaarquiteta.com
bash deploy/install-nginx-site.sh
```

O script valida com `nginx -t` **antes** de recarregar — se houver erro em qualquer site, nada é aplicado.

---

## GitHub Secrets (incluir porta)

| Secret | Valor |
|--------|-------|
| `VPS_HOST` | `72.60.45.216` |
| `VPS_USER` | `root` |
| `VPS_PORT` | `22` |
| `VPS_DEPLOY_PATH` | `/var/www/suaarquiteta` |
| `VPS_APP_PORT` | `3010` |
| `VPS_SSH_KEY` | chave privada do GitHub Actions |

Se `3010` já estiver ocupada, altere em `deploy/project.config.sh`, `deploy/nginx-suaarquiteta.conf`, `deploy/ecosystem.config.cjs` e o secret `VPS_APP_PORT` para a mesma porta.

---

## Comandos úteis (só este projeto)

```bash
pm2 logs suaarquiteta
pm2 restart suaarquiteta
tail -f /var/log/nginx/suaarquiteta.error.log
curl -I http://127.0.0.1:3010
```

---

## Adicionar um projeto novo no futuro

1. Escolher porta livre (ex.: `3011`)
2. Criar `/var/www/nome-do-projeto`
3. Novo arquivo em `/etc/nginx/sites-available/nome-do-projeto` com `server_name` exclusivo
4. `ln -s` em `sites-enabled`, `nginx -t`, `systemctl reload nginx`
5. PM2 com nome único na porta escolhida
6. Anotar na tabela de portas acima
