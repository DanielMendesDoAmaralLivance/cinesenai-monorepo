# @cinesenai-monorepo/types

Package contendo os tipos TypeScript gerados automaticamente pelo Prisma Client, compartilhados entre todos os apps do monorepo.

## 📦 Sobre

Este package contém o Prisma Client gerado e seus tipos TypeScript correspondentes, permitindo que tanto a API quanto o Frontend tenham acesso type-safe ao schema do banco de dados.

## 🎯 Propósito

- Centralizar o Prisma Client em um único local
- Compartilhar tipos de banco de dados entre apps
- Manter sincronização automática com o schema
- Garantir type safety em todo o monorepo

## 🔄 Geração Automática

Os tipos são gerados automaticamente pelo Prisma quando você executa:

```bash
pnpm prisma generate
```

**Configuração no schema.prisma:**

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../../../packages/types/prisma"
  binaryTargets = ["native", "rhel-openssl-3.0.x"]
}
```

## 📋 Conteúdo

Este package contém:

- **Prisma Client**: Cliente de banco de dados completo
- **Types**: Todos os models do Prisma como types TypeScript
- **Enums**: Enumerações do banco de dados
- **Query Engine**: Binários do engine do Prisma

## 🚀 Instalação

Este package é workspace-local e é instalado automaticamente:

```json
{
  "dependencies": {
    "@cinesenai-monorepo/types": "workspace:*"
  }
}
```

## 💻 Uso

### Importar Prisma Client

```typescript
import { PrismaClient } from "@cinesenai-monorepo/types";

const prisma = new PrismaClient();
```

### Importar Types

```typescript
import type {
  Filme,
  Genero,
  Sessao,
  Ingresso,
} from "@cinesenai-monorepo/types";

const filme: Filme = {
  id: 1,
  titulo: "Exemplo",
  sinopse: "Uma sinopse",
  // ... outros campos
};
```

### Importar Namespace Prisma

```typescript
import { Prisma } from "@cinesenai-monorepo/types";

// Usar para tipos compostos
type FilmeWithGeneros = Prisma.FilmeGetPayload<{
  include: { generos: true };
}>;

// Usar para inputs
const createData: Prisma.FilmeCreateInput = {
  titulo: "Novo Filme",
  sinopse: "Sinopse",
  duracao: 120,
  // ...
};
```

## 🏗️ Models Disponíveis

Baseado no schema do Prisma, este package expõe os seguintes models:

### Core Models

- **Filme**: Informações de filmes
- **Genero**: Gêneros de filmes
- **FilmeGenero**: Relacionamento filme-gênero
- **ClassificacaoIndicativa**: Classificações etárias

### Sessões e Salas

- **Sessao**: Sessões de exibição
- **Sala**: Salas de cinema
- **TipoAssento**: Tipos de assentos
- **Assento**: Assentos das salas

### Ingressos

- **Ingresso**: Ingressos vendidos
- **IngressoAssento**: Assentos por ingresso

### Pessoas

- **Pessoa**: Pessoas (atores, diretores, etc.)
- **Cargo**: Cargos (ator, diretor, etc.)
- **FilmePessoa**: Relacionamento filme-pessoa

## 📊 Estrutura

```
types/
├── prisma/              # Gerado pelo Prisma
│   ├── index.d.ts       # Type definitions
│   ├── index.js         # Prisma Client runtime
│   ├── schema.prisma    # Schema copiado
│   ├── client.d.ts      # Cliente types
│   ├── runtime/         # Runtime do Prisma
│   └── libquery_engine-*.node  # Query engines
│
├── package.json
└── README.md
```

## 🔧 Manutenção

### Regenerar Types

Sempre que o schema mudar:

```bash
cd apps/cinesenai-next-api
pnpm prisma generate
```

Isso irá:

1. Ler o `schema.prisma`
2. Gerar tipos TypeScript
3. Compilar o Prisma Client
4. Colocar tudo em `packages/types/prisma`

### Verificar Sincronização

```bash
pnpm prisma validate
```

## ⚙️ Configuração

### package.json

```json
{
  "name": "@cinesenai-monorepo/types",
  "version": "1.0.0",
  "main": "./prisma/index.js",
  "types": "./prisma/index.d.ts",
  "exports": {
    ".": {
      "types": "./prisma/index.d.ts",
      "default": "./prisma/index.js"
    }
  }
}
```

### Targets de Build

O Prisma é configurado para gerar binários para:

- **native**: Plataforma local de desenvolvimento
- **rhel-openssl-3.0.x**: Deploy em servidores RHEL/CentOS

## 💡 Exemplos de Uso

### Na API (cinesenai-next-api)

```typescript
import { PrismaClient } from "@cinesenai-monorepo/types";

const prisma = new PrismaClient();

export async function GET() {
  const filmes = await prisma.filme.findMany({
    include: {
      generos: {
        include: {
          genero: true,
        },
      },
    },
  });

  return Response.json(filmes);
}
```

### No Frontend (cinesenai-totem)

```typescript
import type { Filme, Sessao } from '@cinesenai-monorepo/types';

interface FilmeCardProps {
  filme: Filme;
  sessoes: Sessao[];
}

export function FilmeCard({ filme, sessoes }: FilmeCardProps) {
  return (
    <div>
      <h2>{filme.titulo}</h2>
      <p>{filme.sinopse}</p>
      <span>Duração: {filme.duracao} min</span>
    </div>
  );
}
```

## 🔍 Type Utilities

### Prisma.validator

Validador type-safe para criar queries:

```typescript
import { Prisma } from "@cinesenai-monorepo/types";

const filmeWithGeneros = Prisma.validator<Prisma.FilmeArgs>()({
  include: { generos: true },
});

const filme = await prisma.filme.findUnique({
  where: { id: 1 },
  ...filmeWithGeneros,
});
```

### Prisma.Payload

Extrair tipos de queries complexas:

```typescript
import { Prisma } from "@cinesenai-monorepo/types";

type FilmePayload = Prisma.FilmeGetPayload<{
  include: { generos: true };
}>;
```

## ⚠️ Notas Importantes

1. **Não edite arquivos gerados**: Tudo em `prisma/` é gerado automaticamente
2. **Sincronização**: Sempre regenere após mudanças no schema
3. **Versão**: Use a mesma versão do Prisma em todos os packages
4. **Binários**: Os engines são específicos por plataforma

## 🐛 Troubleshooting

### Engine não encontrado

```bash
# Regenerar com binários corretos
pnpm prisma generate
```

### Types desatualizados

```bash
# Limpar e regenerar
rm -rf packages/types/prisma
pnpm prisma generate
```

### Erro de import

```typescript
// ❌ Errado - importar de subpath
import { Filme } from "@cinesenai-monorepo/types/prisma";

// ✅ Correto - importar do package root
import type { Filme } from "@cinesenai-monorepo/types";
```

## 🔒 Type Safety

Este package garante:

- ✅ Tipos sincronizados com o banco
- ✅ Autocomplete completo no IDE
- ✅ Detecção de erros em compile-time
- ✅ Refatoração segura
- ✅ Documentação inline

## 🚀 Performance

- Types são apenas em compile-time (zero overhead em runtime)
- Prisma Client é otimizado e tree-shakeable
- Query engine compilado em Rust (extremamente rápido)

## 📝 Versionamento

Este package segue o versionamento do Prisma:

- Prisma 6.9.0 ou superior
- Compatível com PostgreSQL 14+

## 🤝 Contribuindo

Como este package é gerado automaticamente:

1. Não faça edições manuais
2. Mudanças devem ser feitas no `schema.prisma`
3. Execute `pnpm prisma generate` após mudanças
4. Commit o schema e os types gerados juntos

## 📄 Licença

Este package é parte do monorepo CineSenai e segue a mesma licença.

## 🔗 Links Úteis

- [Prisma Client Docs](https://www.prisma.io/docs/concepts/components/prisma-client)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [TypeScript Types](https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety)
