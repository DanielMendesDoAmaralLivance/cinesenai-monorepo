# CineSenai Monorepo

Monorepo do sistema CineSenai, um sistema completo de gerenciamento de cinema com API backend e interface de totem para autoatendimento.

## 🏗️ Arquitetura

Este projeto utiliza [Turborepo](https://turborepo.org/) para gerenciar um monorepo que contém:

- **Apps**: Aplicações frontend e backend
- **Packages**: Bibliotecas compartilhadas e configurações

## 📦 Apps e Packages

### Apps

- **`cinesenai-next-api`**: API REST construída com Next.js 14, TypeScript e Prisma ORM

  - Backend completo para gerenciamento de filmes, sessões e ingressos
  - Autenticação e autorização
  - Integração com PostgreSQL via Prisma
  - Testes com Jest

- **`cinesenai-totem`**: Interface de totem para autoatendimento
  - Aplicação React com Vite
  - Interface para compra de ingressos
  - Gerenciamento de estado com Jotai
  - Roteamento com TanStack Router
  - UI com Tailwind CSS e Radix UI

### Packages Compartilhados

- **`@cinesenai-monorepo/types`**: Types gerados automaticamente pelo Prisma Client

  - Tipos TypeScript do banco de dados
  - Compartilhado entre API e Totem

- **`@cinesenai-monorepo/types-custom`**: Types customizados

  - Tipos compostos e utilitários
  - Extends dos tipos do Prisma

- **`@cinesenai-monorepo/ui`**: Biblioteca de componentes React compartilhados

  - Componentes reutilizáveis
  - Button, Card, Code

- **`@cinesenai-monorepo/eslint-config`**: Configurações ESLint

  - `base`: Configuração base
  - `next`: Configuração para Next.js
  - `react-internal`: Configuração para React

- **`@cinesenai-monorepo/typescript-config`**: Configurações TypeScript
  - `base.json`: Configuração base
  - `nextjs.json`: Configuração para Next.js
  - `react-library.json`: Configuração para bibliotecas React

Todos os packages/apps são 100% [TypeScript](https://www.typescriptlang.org/).

## 🚀 Tecnologias Principais

- **Framework**: Next.js 14, React 19, Vite
- **Linguagem**: TypeScript 5.8+
- **Build Tool**: Turborepo 2.5+
- **Package Manager**: pnpm 9.0+
- **ORM**: Prisma 6.9
- **Database**: PostgreSQL
- **UI**: Tailwind CSS 4, Radix UI
- **State Management**: Jotai
- **Routing**: TanStack Router
- **Testing**: Jest

## 📋 Pré-requisitos

- Node.js 18 ou superior
- pnpm 9.0+
- PostgreSQL (para a API)

## ⚙️ Instalação

1. Clone o repositório:

```bash
git clone <repository-url>
cd cinesenai-monorepo
```

2. Instale as dependências:

```bash
pnpm install
```

3. Configure as variáveis de ambiente:

```bash
# Para a API
cd apps/cinesenai-next-api
cp .env.example .env
# Edite o .env com suas credenciais do PostgreSQL
```

4. Execute as migrações do banco de dados:

```bash
cd apps/cinesenai-next-api
pnpm prisma migrate deploy
pnpm prisma db seed  # Opcional: popular o banco com dados de exemplo
```

## 🔧 Desenvolvimento

Para desenvolver todas as aplicações simultaneamente:

```bash
pnpm dev
```

Ou desenvolver apps individualmente:

```bash
# Apenas a API (porta 3001)
pnpm dev --filter=cinesenai-next-api

# Apenas o Totem (porta 5173)
pnpm dev --filter=cinesenai-totem
```

### Portas Padrão

- **API**: `http://localhost:3001`
- **Totem**: `http://localhost:5173`

## 🏗️ Build

Para fazer build de todas as aplicações:

```bash
pnpm build
```

Para fazer build de um app específico:

```bash
pnpm build --filter=cinesenai-next-api
pnpm build --filter=cinesenai-totem
```

## 🧪 Testes

```bash
# Rodar todos os testes
pnpm test

# Testes da API
pnpm test --filter=cinesenai-next-api

# Testes com coverage
pnpm test:coverage --filter=cinesenai-next-api
```

## 📁 Estrutura do Projeto

```
cinesenai-monorepo/
├── apps/
│   ├── cinesenai-next-api/     # Backend API REST
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   └── api/        # Endpoints da API
│   │   │   └── lib/            # Utilitários
│   │   ├── prisma/
│   │   │   ├── schema.prisma   # Schema do banco
│   │   │   ├── migrations/     # Migrações
│   │   │   └── seed.ts         # Dados iniciais
│   │   └── __tests__/          # Testes
│   │
│   └── cinesenai-totem/        # Frontend Totem
│       ├── src/
│       │   ├── pages/          # Páginas da aplicação
│       │   ├── components/     # Componentes React
│       │   ├── atoms/          # Estado global (Jotai)
│       │   ├── enums/          # Enumerações
│       │   └── lib/            # Utilitários
│       └── assets/             # Imagens e recursos
│
├── packages/
│   ├── types/                  # Types gerados do Prisma
│   ├── types-custom/           # Types customizados
│   ├── ui/                     # Componentes compartilhados
│   ├── eslint-config/          # Configurações ESLint
│   └── typescript-config/      # Configurações TypeScript
│
├── package.json                # Root package.json
├── pnpm-workspace.yaml         # Configuração do workspace
├── turbo.json                  # Configuração do Turborepo
└── tsconfig.json               # TypeScript config raiz
```

## 🔍 Scripts Disponíveis

- `pnpm dev` - Inicia modo desenvolvimento de todos os apps
- `pnpm build` - Build de produção de todos os apps
- `pnpm lint` - Executa linting em todos os apps
- `pnpm format` - Formata código com Prettier
- `pnpm check-types` - Verifica tipos TypeScript

## 📚 Documentação Adicional

Para mais informações sobre cada aplicação, consulte:

- [API Documentation](./apps/cinesenai-next-api/README.md)
- [Totem Documentation](./apps/cinesenai-totem/README.md)

## 🔐 Funcionalidades

### API (cinesenai-next-api)

- ✅ CRUD de Filmes
- ✅ CRUD de Gêneros
- ✅ CRUD de Sessões
- ✅ Sistema de Ingressos
- ✅ Classificação Indicativa
- ✅ Gerenciamento de Assentos
- ✅ Validação de dados
- ✅ Testes automatizados

### Totem (cinesenai-totem)

- ✅ Listagem de Filmes em Cartaz
- ✅ Detalhes do Filme
- ✅ Seleção de Sessão
- ✅ Seleção de Assentos
- ✅ Checkout e Pagamento
- ✅ Geração de QR Code do Ingresso
- ✅ Interface responsiva
- ✅ Tema claro/escuro

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é privado e proprietário.

## 🔗 Links Úteis

Aprenda mais sobre as ferramentas utilizadas:

- [Turborepo Documentation](https://turborepo.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [TanStack Router](https://tanstack.com/router)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/docs/primitives/overview/introduction)

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.com/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.com/docs/reference/configuration)
- [CLI Usage](https://turborepo.com/docs/reference/command-line-reference)
