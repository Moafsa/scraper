# 🚀 Web Scraper API - Docker Version

Esta versão roda localmente usando Docker e funciona perfeitamente com o n8n!

## 🏃 Quick Start

### Opção 1: Usar o script automático
```bash
# Execute o arquivo .bat
start-scraper.bat
```

### Opção 2: Comandos manuais
```bash
# 1. Construir a imagem
docker-compose build

# 2. Iniciar o container
docker-compose up -d

# 3. Verificar se está rodando
docker-compose ps
```

## 📡 Endpoints da API

### Health Check
```
GET http://localhost:3000/api/health
```

### Scraping
```
GET http://localhost:3000/api/scrape?url=https://conext.click
```

## 🔧 Configuração no n8n

1. **Crie um nó HTTP Request**
2. **Configure:**
   - **URL:** `http://localhost:3000/api/scrape`
   - **Method:** `GET`
   - **Query Parameters:** 
     - `url` = `{{ $json.url }}` (ou a URL que você quer fazer scraping)

## 🐳 Comandos Docker Úteis

```bash
# Ver logs em tempo real
docker-compose logs -f

# Parar o container
docker-compose down

# Reiniciar o container
docker-compose restart

# Ver status
docker-compose ps

# Reconstruir e iniciar
docker-compose up --build -d
```

## 🔍 Testando a API

### No navegador:
- Health: http://localhost:3000/api/health
- Scrape: http://localhost:3000/api/scrape?url=https://google.com

### No PowerShell:
```powershell
# Health check
Invoke-WebRequest -Uri "http://localhost:3000/api/health"

# Scraping
Invoke-WebRequest -Uri "http://localhost:3000/api/scrape?url=https://conext.click"
```

## 🚀 Vantagens desta solução:

1. ✅ **Funciona localmente** - Sem limitações da Vercel
2. ✅ **Docker otimizado** - Chromium pré-instalado
3. ✅ **Fácil de usar** - Script .bat para iniciar
4. ✅ **Compatível com n8n** - API REST simples
5. ✅ **Logs detalhados** - Fácil debug
6. ✅ **Health checks** - Monitoramento automático

## 🔧 Troubleshooting

### Container não inicia:
```bash
docker-compose logs scraper-api
```

### Porta 3000 ocupada:
Edite o `docker-compose.yml` e mude a porta:
```yaml
ports:
  - "3001:3000"  # Mude para 3001
```

### Reconstruir tudo:
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```
