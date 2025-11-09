# CineSenai Next.js API

API REST completa do CineSenai construída com Next.js 14 API Routes, TypeScript e Prisma ORM. Gerencia todo o backend do sistema de cinema incluindo filmes, sessões, ingressos e assentos.

## 🚀 Tecnologias

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript 5.7+
- **ORM**: Prisma 6.9
- **Database**: PostgreSQL
- **Testing**: Jest 30 + Testing Library
- **Validação**: Built-in validation
- **Date Handling**: date-fns 4.1 + date-fns-tz

## 📋 Pré-requisitos

- Node.js 18+
- pnpm 9.0+
- PostgreSQL 14+

## 🗄️ Modelo de Dados

O banco de dados possui as seguintes entidades principais:

- **Filme**: Informações sobre filmes (título, sinopse, duração, etc.)
- **Genero**: Gêneros cinematográficos
- **FilmeGenero**: Relacionamento muitos-para-muitos entre Filme e Gênero
- **ClassificacaoIndicativa**: Classificação etária dos filmes
- **Sessao**: Sessões de exibição dos filmes
- **Sala**: Salas de cinema
- **TipoAssento**: Tipos de assentos (comum, VIP, etc.)
- **Assento**: Assentos das salas
- **Ingresso**: Ingressos vendidos

## ⚙️ Configuração

1. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

2. Atualize o arquivo `.env` com suas credenciais:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/cinesenai"
```

3. Instale as dependências (do root do monorepo):

```bash
pnpm install
```

4. Execute as migrações do Prisma:

```bash
pnpm prisma migrate deploy
```

5. (Opcional) Popule o banco com dados de exemplo:

```bash
pnpm prisma db seed
```

## 🔧 Desenvolvimento

Inicie o servidor de desenvolvimento:

```bash
pnpm dev
```

A API estará disponível em `http://localhost:3001`

### Comandos Prisma Úteis

```bash
# Abrir Prisma Studio (GUI do banco)
pnpm prisma studio

# Criar nova migração
pnpm prisma migrate dev --name nome_da_migracao

# Resetar banco de dados (cuidado!)
pnpm prisma migrate reset

# Gerar Prisma Client
pnpm prisma generate
```

## 🧪 Testes

```bash
# Executar todos os testes
pnpm test

# Modo watch
pnpm test:watch

# Com coverage
pnpm test:coverage
```

Os relatórios de coverage ficam em `coverage/lcov-report/index.html`

## 📦 Build e Deploy

### Build Local

```bash
pnpm build
```

### Iniciar Produção

```bash
pnpm start
```

## 🌐 Deploy na Vercel

1. Faça push do código para o GitHub

2. Importe o projeto na Vercel

3. Configure as variáveis de ambiente no painel da Vercel:

   - `DATABASE_URL`

4. Adicione o comando de build customizado se necessário:

```bash
cd apps/cinesenai-next-api && pnpm prisma generate && pnpm build
```

5. Deploy automático será feito a cada push

### Deploy Manual

Para fazer deploy em outros servidores:

1. Build da aplicação:

```bash
pnpm build
```

2. Configure as variáveis de ambiente no servidor

3. Execute as migrações:

```bash
pnpm prisma migrate deploy
```

4. Inicie a aplicação:

```bash
pnpm start
```

## 📡 API Endpoints

### Filmes

- `GET /api/filme` - Lista todos os filmes
- `GET /api/filme?emCartaz=true` - Lista filmes em cartaz
- `GET /api/filme/:id` - Detalhes de um filme
- `POST /api/filme` - Cria um novo filme
- `PUT /api/filme/:id` - Atualiza um filme
- `DELETE /api/filme/:id` - Remove um filme

### Gêneros

- `GET /api/genero` - Lista todos os gêneros
- `GET /api/genero/:id` - Detalhes de um gênero
- `POST /api/genero` - Cria um novo gênero
- `PUT /api/genero/:id` - Atualiza um gênero
- `DELETE /api/genero/:id` - Remove um gênero

### Sessões

- `GET /api/sessao` - Lista todas as sessões
- `GET /api/sessao?filmeId=:id` - Sessões de um filme específico
- `GET /api/sessao/:id` - Detalhes de uma sessão
- `POST /api/sessao` - Cria uma nova sessão
- `PUT /api/sessao/:id` - Atualiza uma sessão
- `DELETE /api/sessao/:id` - Remove uma sessão

### Ingressos

- `GET /api/ingresso` - Lista todos os ingressos
- `GET /api/ingresso/:id` - Detalhes de um ingresso
- `POST /api/ingresso` - Cria um novo ingresso (compra)
- `DELETE /api/ingresso/:id` - Cancela um ingresso

## 🔍 Exemplos de Uso

### Buscar filmes em cartaz

```bash
curl http://localhost:3001/api/filme?emCartaz=true
```

### Criar um novo filme

```bash
curl -X POST http://localhost:3001/api/filme \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Exemplo Filme",
    "sinopse": "Uma história incrível",
    "duracao": 120,
    "classificacaoIndicativaId": 1,
    "emCartaz": true
  }'
```

### Buscar sessões de um filme

```bash
curl http://localhost:3001/api/sessao?filmeId=1
```

## 🏗️ Estrutura do Projeto

```
cinesenai-next-api/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── filme/         # Endpoints de filmes
│   │   │   ├── genero/        # Endpoints de gêneros
│   │   │   ├── sessao/        # Endpoints de sessões
│   │   │   └── ingresso/      # Endpoints de ingressos
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── lib/
│   │   └── prisma.ts          # Cliente Prisma configurado
│   └── middleware.ts
│
├── prisma/
│   ├── schema.prisma          # Schema do banco de dados
│   ├── seed.ts                # Dados iniciais
│   ├── queries.sql            # Queries SQL úteis
│   └── migrations/            # Histórico de migrações
│
├── __tests__/                 # Testes unitários e de integração
├── coverage/                  # Relatórios de coverage
├── jest.config.js
├── jest.setup.js
├── next.config.js
├── tsconfig.json
└── package.json
```

## 🧩 Integração com Monorepo

Esta API faz parte do monorepo CineSenai e compartilha:

- **@cinesenai-monorepo/types**: Types gerados do Prisma Client
- **@cinesenai-monorepo/types-custom**: Types customizados e compostos
- **@cinesenai-monorepo/eslint-config**: Configurações de linting
- **@cinesenai-monorepo/typescript-config**: Configurações TypeScript

## 🐛 Debugging

Para habilitar logs detalhados do Prisma:

```env
DEBUG=prisma:*
```

## 📊 Monitoramento

A API inclui:

- ✅ Error handling centralizado
- ✅ Validação de dados
- ✅ Logs estruturados
- ✅ Health checks

## 🔐 Segurança

- Validação de input em todos os endpoints
- Sanitização de dados
- CORS configurado
- Rate limiting (recomendado para produção)

## 📝 Notas Importantes

1. O Prisma Client é gerado em `packages/types/prisma` para ser compartilhado
2. As migrações devem ser criadas apenas neste app
3. Use `pnpm prisma studio` para visualizar dados do banco
4. Sempre rode testes antes de fazer commit

## 🤝 Contribuindo

1. Crie uma branch para sua feature
2. Escreva testes para novas funcionalidades
3. Mantenha o coverage acima de 80%
4. Siga os padrões de código do ESLint
5. Atualize a documentação quando necessário

## 📞 Suporte

Para questões e suporte, consulte a documentação principal do monorepo ou abra uma issue no repositório. 2. Conecte o repositório na Vercel 3. Configure a variável de ambiente `DATABASE_URL` no painel da Vercel 4. Deploy automático!

## 📚 Endpoints

- `GET /api/filme/em-cartaz` - Lista filmes em cartaz
- `GET /api/filme/em-breve` - Lista filmes em breve
- `GET /api/filme/[id]` - Busca filme por ID
- `GET /api/genero` - Lista todos os gêneros
- `GET /api/sessao/[id]` - Busca sessão por ID
- `GET /api/ingresso/[id]` - Busca ingresso por ID
- `POST /api/ingresso` - Cria um novo ingresso
