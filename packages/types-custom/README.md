# @cinesenai-monorepo/types-custom

Package de tipos customizados e compostos para o CineSenai, complementando os tipos gerados automaticamente pelo Prisma Client.

## 📦 Sobre

Este package contém tipos TypeScript customizados que estendem e compõem os tipos do Prisma para criar interfaces mais convenientes e específicas para as necessidades da aplicação.

## 🎯 Propósito

- Tipos compostos que incluem relações do Prisma
- Tipos de payload customizados
- Interfaces para DTOs e requests/responses
- Types utilities reutilizáveis

## 📋 Tipos Disponíveis

### FilmeComGeneros

Tipo de filme que inclui seus gêneros relacionados:

```typescript
type FilmeComGeneros = Prisma.FilmeGetPayload<{
  include: {
    generos: {
      include: {
        genero: true;
      };
    };
  };
}>;
```

**Uso:**

```typescript
import type { FilmeComGeneros } from "@cinesenai-monorepo/types-custom";

const filme: FilmeComGeneros = {
  id: 1,
  titulo: "Exemplo",
  generos: [
    {
      id: 1,
      genero: {
        id: 1,
        nome: "Ação",
      },
    },
  ],
};
```

### FilmeDetalhes

Tipo completo de filme com todas as relações:

```typescript
type FilmeDetalhes = Prisma.FilmeGetPayload<{
  include: {
    generos: {
      include: {
        genero: true;
      };
    };
    integrantes: {
      include: {
        pessoa: true;
        cargo: true;
      };
    };
    classificacaoIndicativa: true;
    sessoes: true;
  };
}>;
```

**Uso:**

```typescript
import type { FilmeDetalhes } from "@cinesenai-monorepo/types-custom";

// Usado na página de detalhes do filme
const filmeCompleto: FilmeDetalhes = await fetchFilmeDetalhes(id);
```

### SessaoComRelacoes

Tipo de sessão incluindo filme, sala e assentos:

```typescript
type SessaoComRelacoes = Prisma.SessaoGetPayload<{
  include: {
    filme: true;
    sala: {
      include: {
        assentos: {
          include: {
            tipoAssento: true;
          };
        };
      };
    };
  };
}>;
```

### IngressoCompleto

Tipo de ingresso com todas as informações necessárias:

```typescript
type IngressoCompleto = Prisma.IngressoGetPayload<{
  include: {
    sessao: {
      include: {
        filme: true;
        sala: true;
      };
    };
    assentos: {
      include: {
        assento: {
          include: {
            tipoAssento: true;
          };
        };
      };
    };
  };
}>;
```

## 🚀 Instalação

Este package é workspace-local e é instalado automaticamente como dependência:

```json
{
  "dependencies": {
    "@cinesenai-monorepo/types-custom": "workspace:*"
  }
}
```

## 💻 Uso

### Importação

```typescript
import type {
  FilmeComGeneros,
  FilmeDetalhes,
  SessaoComRelacoes,
  IngressoCompleto,
} from "@cinesenai-monorepo/types-custom";
```

### Exemplo Prático

**API Route:**

```typescript
import type { FilmeDetalhes } from "@cinesenai-monorepo/types-custom";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const filmes: FilmeDetalhes[] = await prisma.filme.findMany({
    include: {
      generos: {
        include: {
          genero: true,
        },
      },
      integrantes: {
        include: {
          pessoa: true,
          cargo: true,
        },
      },
      classificacaoIndicativa: true,
      sessoes: true,
    },
  });

  return Response.json(filmes);
}
```

**Frontend Component:**

```typescript
import type { FilmeComGeneros } from '@cinesenai-monorepo/types-custom';

interface FilmeCardProps {
  filme: FilmeComGeneros;
}

export function FilmeCard({ filme }: FilmeCardProps) {
  return (
    <div>
      <h2>{filme.titulo}</h2>
      <div>
        {filme.generos.map(fg => (
          <span key={fg.id}>{fg.genero.nome}</span>
        ))}
      </div>
    </div>
  );
}
```

## 🔧 Manutenção

### Adicionar Novos Tipos

1. Edite `index.ts`
2. Use o pattern `Prisma.<Model>GetPayload<{}>`
3. Exporte o tipo
4. Documente no README

**Exemplo:**

```typescript
export type NovoTipo = Prisma.ModelGetPayload<{
  include: {
    relacao: true;
  };
}>;
```

### Quando Criar um Novo Tipo

Crie um novo tipo customizado quando:

- Precisar do mesmo include em múltiplos lugares
- O tipo composto for usado em interfaces de API
- Quiser melhorar a legibilidade do código
- O tipo representa um conceito de domínio específico

## 📊 Estrutura

```
types-custom/
├── index.ts          # Exports de todos os tipos
├── package.json
├── tsconfig.json
└── README.md
```

## 🔗 Dependências

- `@cinesenai-monorepo/types`: Types base do Prisma Client

## ✅ Boas Práticas

1. **Nomenclatura**: Use nomes descritivos que reflitam o uso
2. **Documentação**: Comente tipos complexos
3. **Reutilização**: DRY - não duplique includes
4. **Consistência**: Siga o pattern existente
5. **Type Safety**: Prefira types a interfaces para aliases

## 🎓 Vantagens

- ✅ **Type Safety**: Erros em tempo de compilação
- ✅ **IntelliSense**: Autocomplete completo
- ✅ **Manutenibilidade**: Centraliza definições
- ✅ **Reutilização**: DRY em toda a aplicação
- ✅ **Documentação**: Types são auto-documentados

## 🤝 Contribuindo

Ao adicionar novos tipos:

1. Mantenha consistência com tipos existentes
2. Use `Prisma.XxxGetPayload` para tipos compostos
3. Documente o propósito e uso
4. Atualize este README

## 📝 Notas

- Types são gerados em build time
- Sincronizados com o schema do Prisma
- Compartilhados entre API e Frontend
- Não contém lógica de runtime

## 🔍 Troubleshooting

### Type não reconhecido

Certifique-se que:

1. O package está instalado: `pnpm install`
2. O Prisma Client foi gerado: `pnpm prisma generate`
3. O TypeScript está atualizado

### Erro de import

```typescript
// ❌ Errado
import { FilmeComGeneros } from "@cinesenai-monorepo/types-custom/index";

// ✅ Correto
import type { FilmeComGeneros } from "@cinesenai-monorepo/types-custom";
```

## 📄 Licença

Este package é parte do monorepo CineSenai e segue a mesma licença.
