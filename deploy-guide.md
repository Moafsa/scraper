# Guia de Deploy na Vercel



Este guia detalhado irá ajudá-lo a publicar sua API de scraping na Vercel de forma rápida e eficiente.

## Pré-requisitos

1. **Conta na Vercel** (gratuita)
   - Acesse [vercel.com](https://vercel.com)
   - Faça login com GitHub, GitLab ou Bitbucket

2. **Vercel CLI** instalado
   ```bash
   npm install -g vercel
   ```

3. **Node.js 18+** instalado
   - Verifique com: `node --version`

## Passo a Passo do Deploy

### 1. Preparação do Projeto

Certifique-se de que todos os arquivos estão no lugar:

```
web-scraper-api/
├── api/
│   └── scrape.js
├── package.json
├── vercel.json
├── README.md
└── .gitignore
```

### 2. Login na Vercel

```bash
vercel login
```

Siga as instruções para autenticar sua conta.

### 3. Deploy do Projeto

Na pasta do projeto, execute:

```bash
vercel
```

**Responda às perguntas:**

```
? Set up and deploy "~/path/to/web-scraper-api"? [Y/n] Y
? Which scope do you want to deploy to? [seu-usuario]
? Link to existing project? [y/N] N
? What's your project's name? web-scraper-api
? In which directory is your code located? ./
```

### 4. Configuração Automática

A Vercel irá:
- Detectar que é um projeto Node.js
- Instalar as dependências
- Fazer o build
- Fazer o deploy

### 5. URL da API

Após o deploy, você receberá uma URL como:
```
https://web-scraper-api-xxxxx.vercel.app
```

Sua API estará disponível em:
```
https://web-scraper-api-xxxxx.vercel.app/api/scrape
```

## Testando a API

### 1. Health Check

```bash
curl "https://web-scraper-api-xxxxx.vercel.app/api/health"
```

Resposta esperada:
```json
{
  "status": "OK",
  "message": "Web Scraper API is running",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### 2. Teste de Scraping

```bash
curl "https://web-scraper-api-xxxxx.vercel.app/api/scrape?url=https://example.com"
```

## Configuração no n8n

### 1. Adicione um nó HTTP Request

### 2. Configure o nó:

**Método:** GET

**URL:** `https://web-scraper-api-xxxxx.vercel.app/api/scrape`

**Send Query Parameters:** ✅ Ativar

**Parameters:**
- Name: `url`
- Value: `https://www.cepea.esalq.usp.br/rss.php` (ou sua URL)

### 3. Conecte ao nó XML

Para processar RSS/XML, conecte o resultado ao nó XML.

## Monitoramento e Logs

### Ver Logs

```bash
vercel logs
```

### Ver Detalhes do Projeto

```bash
vercel ls
```

### Re-deploy

Para atualizações futuras:

```bash
vercel --prod
```

## Troubleshooting

### Erro: "Function timeout"

**Solução:** O timeout padrão é 10s. Aumente no `vercel.json`:

```json
{
  "functions": {
    "api/scrape.js": {
      "maxDuration": 60
    }
  }
}
```

### Erro: "Memory limit exceeded"

**Solução:** A API já está otimizada para liberar recursos automaticamente. Se persistir, considere:

1. Verificar se o site não está muito pesado
2. Implementar cache para sites frequentemente acessados

### Erro: "Module not found"

**Solução:** Verifique se todas as dependências estão no `package.json`:

```bash
npm install
vercel --prod
```

## Otimizações

### 1. Custom Domain (Opcional)

Na dashboard da Vercel:
1. Vá para Settings > Domains
2. Adicione seu domínio personalizado

### 2. Environment Variables (Se necessário)

```bash
vercel env add VARIABLE_NAME
```

### 3. Cache (Para sites frequentemente acessados)

Considere implementar cache Redis ou similar para sites que você acessa frequentemente.

## Limites da Vercel Free Tier

- **100GB-hours** de execução por mês
- **10 segundos** de timeout (configurável até 60s)
- **1024MB** de memória por função
- **1000** invocações por dia

Para uso intensivo, considere o plano Pro ($20/mês).

## Próximos Passos

1. **Teste a API** com diferentes sites
2. **Configure no n8n** conforme o guia
3. **Monitore os logs** para otimizações
4. **Considere implementar cache** se necessário

## Suporte

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Vercel Community:** [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- **Playwright Docs:** [playwright.dev](https://playwright.dev)

---

**🎉 Parabéns! Sua API de scraping está no ar e pronta para uso!**
