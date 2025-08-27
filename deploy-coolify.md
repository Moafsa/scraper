# 🚀 Deploy na Coolify

## Passo a passo completo:

### 1. Preparar o repositório
```bash
# Certifique-se de que todos os arquivos estão commitados
git add .
git commit -m "Add Coolify deployment configuration"
git push origin main
```

### 2. Acessar a Coolify
- Acesse sua instância da Coolify
- Faça login na dashboard

### 3. Criar novo projeto
- Clique em **"New Project"**
- Escolha **"Git Repository"**
- Conecte seu repositório GitHub/GitLab

### 4. Configurar o projeto
- **Nome:** `web-scraper-api`
- **Branch:** `main`
- **Build Pack:** `Docker`
- **Dockerfile:** `Dockerfile` (deve ser detectado automaticamente)

### 5. Configurar variáveis de ambiente
Na seção **Environment Variables**, adicione:

```
NODE_ENV=production
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
PORT=3000
```

### 6. Configurar domínio (opcional)
- **Custom Domain:** `scraper.suaempresa.com` (ou o domínio que preferir)
- **SSL:** Automático via Let's Encrypt

### 7. Deploy
- Clique em **"Deploy"**
- A Coolify irá:
  - Fazer build da imagem Docker
  - Instalar dependências
  - Configurar o Chromium
  - Iniciar o container

### 8. Verificar o deploy
Após o deploy, você receberá uma URL como:
- `https://scraper-xxxxx.coolify.app` (se usar subdomínio da Coolify)
- `https://scraper.suaempresa.com` (se usar domínio customizado)

### 9. Testar a API
```bash
# Health check
curl https://sua-url.coolify.app/api/health

# Scraping
curl "https://sua-url.coolify.app/api/scrape?url=https://conext.click"
```

### 10. Configurar no n8n
- **URL:** `https://sua-url.coolify.app/api/scrape`
- **Method:** `GET`
- **Query Parameters:** `url` = sua URL alvo

## 🎯 Vantagens da Coolify:

1. ✅ **Docker nativo** - Suporte completo ao Docker
2. ✅ **Chromium incluído** - Sem problemas de dependências
3. ✅ **SSL automático** - HTTPS gratuito
4. ✅ **Deploy automático** - Via webhook do Git
5. ✅ **Logs em tempo real** - Fácil debug
6. ✅ **Escalabilidade** - Recursos configuráveis
7. ✅ **Domínio customizado** - URLs profissionais
8. ✅ **Backup automático** - Segurança dos dados

## 🔧 Configurações avançadas:

### Recursos do container:
```yaml
# No coolify.yml
deploy:
  resources:
    limits:
      memory: 1G
      cpus: '0.5'
    reservations:
      memory: 512M
      cpus: '0.25'
```

### Health checks:
```yaml
healthcheck:
  test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:3000/api/health"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

## 🚨 Troubleshooting:

### Build falha:
1. Verifique os logs na Coolify
2. Confirme que o Dockerfile está correto
3. Verifique se todas as dependências estão no package.json

### Container não inicia:
1. Verifique as variáveis de ambiente
2. Confirme que a porta 3000 está exposta
3. Verifique os logs do container

### Scraping falha:
1. Teste localmente primeiro
2. Verifique se o Chromium está instalado
3. Confirme as permissões do container

## 📊 Monitoramento:

### Logs em tempo real:
- Acesse a dashboard da Coolify
- Vá em **Logs** do seu projeto
- Veja os logs em tempo real

### Métricas:
- CPU e memória
- Requests por minuto
- Tempo de resposta
- Status de saúde

## 🔄 Deploy automático:

### Webhook do Git:
1. Na Coolify, vá em **Settings**
2. Copie a URL do webhook
3. No GitHub/GitLab, adicione o webhook
4. A cada push, deploy automático!

### Branch específica:
- Configure para fazer deploy apenas da branch `main`
- Ou configure para `staging` e `production`
