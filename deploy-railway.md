# 🚀 Deploy no Railway

## Passo a passo:

### 1. Criar conta no Railway
- Acesse: https://railway.app
- Faça login com GitHub

### 2. Conectar repositório
- Clique em "New Project"
- Selecione "Deploy from GitHub repo"
- Escolha este repositório

### 3. Configurar variáveis de ambiente
No dashboard do Railway, adicione:
```
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
NODE_ENV=production
```

### 4. Deploy automático
- O Railway detectará automaticamente o `railway.json`
- Usará o `nixpacks.toml` para instalar dependências
- Deploy será automático

### 5. Obter URL
- Após o deploy, você receberá uma URL como:
  `https://scraper-production-xxxx.up.railway.app`

### 6. Testar
```
# Health check
https://sua-url.up.railway.app/api/health

# Scraping
https://sua-url.up.railway.app/api/scrape?url=https://conext.click
```

### 7. Configurar no n8n
- URL: `https://sua-url.up.railway.app/api/scrape`
- Query: `url` = sua URL alvo

## 🎯 Vantagens do Railway:
- ✅ Suporte nativo ao Chromium
- ✅ Deploy automático via GitHub
- ✅ HTTPS automático
- ✅ Escalabilidade automática
- ✅ Logs em tempo real
