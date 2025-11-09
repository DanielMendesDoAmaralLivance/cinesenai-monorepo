# @cinesenai-monorepo/typescript-config

Configurações TypeScript compartilhadas para todo o monorepo CineSenai. Fornece tsconfig base e especializados para diferentes tipos de projetos.

## 📦 Sobre

Este package contém configurações TypeScript reutilizáveis que garantem consistência de tipos e configurações de compilação em todo o monorepo.

## 🎯 Propósito

- Centralizar configurações TypeScript
- Garantir consistência de tipos
- Facilitar manutenção de tsconfig
- Aplicar boas práticas TypeScript
- Otimizar configurações para cada tipo de projeto

## 📋 Configurações Disponíveis

### base.json

Configuração base para qualquer projeto TypeScript.

**Uso:**

```json
{
  "extends": "@cinesenai-monorepo/typescript-config/base.json",
  "compilerOptions": {
    // suas configurações adicionais
  }
}
```

**Características:**

- `strict`: true - Type checking estrito
- `esModuleInterop`: true - Compatibilidade com módulos
- `skipLibCheck`: true - Pula checagem de .d.ts
- `forceConsistentCasingInFileNames`: true
- `moduleResolution`: "bundler"
- `target`: "ES2022"
- `lib`: ["ES2022", "DOM", "DOM.Iterable"]

### nextjs.json

Configuração otimizada para aplicações Next.js.

**Uso:**

```json
{
  "extends": "@cinesenai-monorepo/typescript-config/nextjs.json",
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

**Características:**

- Extends `base.json`
- `jsx`: "preserve" - Para o compilador Next.js
- `incremental`: true - Build incremental
- `plugins`: Next.js plugin
- `paths`: Configurado para aliases do Next.js
- `module`: "esnext"
- `moduleResolution`: "bundler"

### react-library.json

Configuração para bibliotecas React (como `@cinesenai-monorepo/ui`).

**Uso:**

```json
{
  "extends": "@cinesenai-monorepo/typescript-config/react-library.json",
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```

**Características:**

- Extends `base.json`
- `jsx`: "react-jsx" - JSX runtime moderno
- `declaration`: true - Gera arquivos .d.ts
- `declarationMap`: true - Source maps para types
- `composite`: true - Para project references

## 🚀 Instalação

Este package é workspace-local e é instalado automaticamente:

```json
{
  "devDependencies": {
    "@cinesenai-monorepo/typescript-config": "workspace:*"
  }
}
```

## 💻 Uso

### No cinesenai-next-api

```json
// apps/cinesenai-next-api/tsconfig.json
{
  "extends": "@cinesenai-monorepo/typescript-config/nextjs.json",
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### No cinesenai-totem

```json
// apps/cinesenai-totem/tsconfig.json
{
  "extends": "@cinesenai-monorepo/typescript-config/base.json",
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### No @cinesenai-monorepo/ui

```json
// packages/ui/tsconfig.json
{
  "extends": "@cinesenai-monorepo/typescript-config/react-library.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
```

### No @cinesenai-monorepo/types-custom

```json
// packages/types-custom/tsconfig.json
{
  "extends": "@cinesenai-monorepo/typescript-config/base.json",
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist"
  },
  "include": ["index.ts"]
}
```

## 🏗️ Estrutura

```
typescript-config/
├── base.json            # Configuração base
├── nextjs.json          # Configuração Next.js
├── react-library.json   # Configuração React library
├── package.json
└── README.md
```

## 📐 Configurações Detalhadas

### base.json Completo

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowJs": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "allowSyntheticDefaultImports": true
  }
}
```

### Opções Importantes

#### strict: true

Habilita todas as checagens estritas:

- `noImplicitAny`: true
- `strictNullChecks`: true
- `strictFunctionTypes`: true
- `strictBindCallApply`: true
- `strictPropertyInitialization`: true
- `noImplicitThis`: true
- `alwaysStrict`: true

#### skipLibCheck: true

Pula checagem de tipos em arquivos `.d.ts` de node_modules para:

- ✅ Compilação mais rápida
- ✅ Evita erros em libs de terceiros
- ⚠️ Pode esconder erros de tipos incompatíveis

#### isolatedModules: true

Garante que cada arquivo pode ser compilado isoladamente:

- ✅ Necessário para transpiladores como Babel, esbuild
- ✅ Necessário para Vite, Next.js
- ✅ Previne padrões problemáticos

## 🔧 Customização

### Path Mapping

```json
{
  "extends": "@cinesenai-monorepo/typescript-config/base.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@lib/*": ["./src/lib/*"]
    }
  }
}
```

### Strict Mode Customizado

```json
{
  "extends": "@cinesenai-monorepo/typescript-config/base.json",
  "compilerOptions": {
    "strict": false,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

### Target e Lib

```json
{
  "extends": "@cinesenai-monorepo/typescript-config/base.json",
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM"]
  }
}
```

## 🧪 Validação

### Type Check

```bash
# Verificar tipos sem compilar
pnpm tsc --noEmit

# Verificar tipos de um projeto específico
pnpm tsc --noEmit -p apps/cinesenai-next-api
```

### Build

```bash
# Compilar TypeScript
pnpm tsc

# Compilar com watch
pnpm tsc --watch
```

## 📊 Project References

Para monorepos grandes, use project references:

```json
// Root tsconfig.json
{
  "files": [],
  "references": [
    { "path": "./apps/cinesenai-next-api" },
    { "path": "./apps/cinesenai-totem" },
    { "path": "./packages/ui" },
    { "path": "./packages/types-custom" }
  ]
}
```

Build incremental:

```bash
pnpm tsc --build
```

## ✅ Boas Práticas

1. **Use strict mode**: Evita muitos bugs
2. **Não use any**: Prefira unknown ou tipos específicos
3. **skipLibCheck**: Mantenha true para performance
4. **isolatedModules**: Sempre true em apps modernos
5. **noEmit**: True para apps que usam bundler próprio
6. **Path aliases**: Use para imports limpos

## 🐛 Troubleshooting

### Erro: Cannot find module

```json
// Adicione ao compilerOptions
{
  "moduleResolution": "bundler",
  "resolveJsonModule": true
}
```

### Erro: Cannot use JSX

```json
// Para React
{
  "jsx": "react-jsx"
}

// Para Next.js
{
  "jsx": "preserve"
}
```

### Tipos não encontrados

```bash
# Instalar types
pnpm add -D @types/node @types/react @types/react-dom

# Adicionar ao tsconfig
{
  "compilerOptions": {
    "types": ["node", "jest"]
  }
}
```

### Conflito de versões

```json
// Force version resolution no package.json root
{
  "pnpm": {
    "overrides": {
      "typescript": "5.8.2"
    }
  }
}
```

## 🔄 Versionamento

- Versão atual: `1.0.0`
- Compatível com TypeScript 5.8+
- Segue especificação ES2022

## 📝 Flags Recomendados

### Para Desenvolvimento

```json
{
  "compilerOptions": {
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true
  }
}
```

### Para Produção

```json
{
  "compilerOptions": {
    "removeComments": true,
    "sourceMap": false,
    "declaration": true,
    "declarationMap": true
  }
}
```

## 🤝 Contribuindo

### Modificar Configuração Base

1. Edite o arquivo apropriado (base.json, nextjs.json, etc.)
2. Teste em todos os apps do monorepo
3. Documente a mudança
4. Abra PR com explicação

### Adicionar Nova Configuração

1. Crie novo arquivo JSON
2. Extend de `base.json` se apropriado
3. Documente no README
4. Atualize package.json exports

## 📄 Licença

Este package é parte do monorepo CineSenai e segue a mesma licença.

## 🔗 Links Úteis

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TSConfig Reference](https://www.typescriptlang.org/tsconfig)
- [Next.js TypeScript](https://nextjs.org/docs/app/building-your-application/configuring/typescript)
- [Vite TypeScript](https://vitejs.dev/guide/features.html#typescript)
