# CineSenai Next.js API

API REST do CineSenai construída com Next.js API Routes, pronta para deploy na Vercel.

## 🚀 Tecnologias

- Next.js 14
- TypeScript
- Prisma ORM
- PostgreSQL

## 📋 Pré-requisitos

- Node.js 18+
- pnpm
- PostgreSQL

## ⚙️ Configuração

1. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

2. Atualize o `DATABASE_URL` no arquivo `.env` com suas credenciais do banco de dados.

3. Instale as dependências:

```bash
pnpm install
```

## 🔧 Desenvolvimento

```bash
pnpm dev
```

A API estará disponível em `http://localhost:3001`

## 📦 Build

```bash
pnpm build
```

## 🌐 Deploy na Vercel

1. Faça push do código para o GitHub
2. Conecte o repositório na Vercel
3. Configure a variável de ambiente `DATABASE_URL` no painel da Vercel
4. Deploy automático!

## 📚 Endpoints

- `GET /api/filme/em-cartaz` - Lista filmes em cartaz
- `GET /api/filme/em-breve` - Lista filmes em breve
- `GET /api/filme/[id]` - Busca filme por ID
- `GET /api/genero` - Lista todos os gêneros
- `GET /api/sessao/[id]` - Busca sessão por ID
- `GET /api/ingresso/[id]` - Busca ingresso por ID
- `POST /api/ingresso` - Cria um novo ingresso
