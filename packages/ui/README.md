# @cinesenai-monorepo/ui

Biblioteca de componentes React compartilhados para o CineSenai monorepo. Fornece componentes UI reutilizáveis que podem ser usados em múltiplas aplicações.

## 📦 Sobre

Este package contém componentes React genéricos e reutilizáveis que são compartilhados entre os apps do monorepo (API e Totem).

## 🎯 Propósito

- Centralizar componentes UI reutilizáveis
- Manter consistência visual entre apps
- Evitar duplicação de código
- Facilitar manutenção de componentes

## 📋 Componentes Disponíveis

### Button

Componente de botão genérico e reutilizável.

**Props:**

- `children: ReactNode` - Conteúdo do botão
- `className?: string` - Classes CSS customizadas
- `appName: string` - Nome do app (para demo)

**Uso:**

```tsx
import { Button } from "@cinesenai-monorepo/ui/button";

<Button appName="totem" className="bg-blue-500">
  Clique aqui
</Button>;
```

### Card

Componente de card para exibir conteúdo agrupado.

**Uso:**

```tsx
import { Card } from "@cinesenai-monorepo/ui/card";

<Card>
  <h2>Título</h2>
  <p>Conteúdo do card</p>
</Card>;
```

### Code

Componente para exibir blocos de código.

**Uso:**

```tsx
import { Code } from "@cinesenai-monorepo/ui/code";

<Code language="typescript">{`const exemplo = "código";`}</Code>;
```

## 🚀 Instalação

Este package é workspace-local e é instalado automaticamente:

```json
{
  "dependencies": {
    "@cinesenai-monorepo/ui": "workspace:*"
  }
}
```

## 💻 Uso

### Importação Individual

```typescript
import { Button } from "@cinesenai-monorepo/ui/button";
import { Card } from "@cinesenai-monorepo/ui/card";
import { Code } from "@cinesenai-monorepo/ui/code";
```

### Exemplo Completo

```tsx
import { Button } from "@cinesenai-monorepo/ui/button";
import { Card } from "@cinesenai-monorepo/ui/card";

export function ExamplePage() {
  return (
    <Card>
      <h1>Bem-vindo</h1>
      <p>Esta é uma página de exemplo</p>
      <Button appName="example">Continuar</Button>
    </Card>
  );
}
```

## 🏗️ Estrutura

```
ui/
├── src/
│   ├── button.tsx       # Componente Button
│   ├── card.tsx         # Componente Card
│   └── code.tsx         # Componente Code
│
├── turbo/
│   └── generators/      # Geradores Turbo (opcional)
│
├── package.json
├── tsconfig.json
├── eslint.config.mjs
└── README.md
```

## 🔧 Desenvolvimento

### Adicionar Novo Componente

1. Crie um novo arquivo em `src/`:

```tsx
// src/novo-componente.tsx
"use client";

import { ReactNode } from "react";

interface NovoComponenteProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

export const NovoComponente = ({
  children,
  variant = "primary",
}: NovoComponenteProps) => {
  return <div className={variant}>{children}</div>;
};
```

2. Documente no README

3. Use nos apps

## 📐 Design Principles

1. **Componentes Simples**: Focados em uma única responsabilidade
2. **Customizáveis**: Aceitam className para override de estilos
3. **Type-Safe**: Props fortemente tipadas
4. **Reutilizáveis**: Genéricos o suficiente para múltiplos contextos
5. **Acessíveis**: Seguem boas práticas de acessibilidade

## 🎨 Styling

### Abordagem Atual

- Aceita `className` prop para customização
- Não impõe framework CSS específico
- Permite apps usarem seus próprios sistemas de estilo

### Tailwind CSS

Para usar com Tailwind:

```tsx
<Button
  appName="totem"
  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
>
  Comprar Ingresso
</Button>
```

## ✅ Boas Práticas

- Use TypeScript para todas as props
- Marque componentes com "use client" quando necessário
- Componentes devem ser genéricos e reutilizáveis
- Documente props com JSDoc
- Siga convenções do React

## 🤝 Contribuindo

### Adicionar Componente

1. Crie arquivo em `src/`
2. Use TypeScript e "use client" se necessário
3. Documente props com JSDoc
4. Adicione export no `package.json`
5. Atualize README

## 📄 Licença

Este package é parte do monorepo CineSenai e segue a mesma licença.
