# @cinesenai-monorepo/eslint-config

Configurações ESLint compartilhadas para todo o monorepo CineSenai. Garante consistência de código e boas práticas em todos os apps e packages.

## 📦 Sobre

Este package contém configurações ESLint pré-definidas que podem ser estendidas pelos apps e packages do monorepo.

## 🎯 Propósito

- Manter consistência de código em todo o monorepo
- Aplicar boas práticas de JavaScript/TypeScript
- Detectar erros comuns antes do runtime
- Facilitar code reviews
- Padronizar formatação

## 📋 Configurações Disponíveis

### base.js

Configuração base para projetos JavaScript/TypeScript genéricos.

**Uso:**

```js
// eslint.config.js
import baseConfig from "@cinesenai-monorepo/eslint-config/base";

export default [
  ...baseConfig,
  // suas configurações adicionais
];
```

**Inclui:**

- ESLint recommended rules
- TypeScript ESLint rules
- Regras de formatação básicas
- Boas práticas gerais

### next.js

Configuração específica para aplicações Next.js.

**Uso:**

```js
// eslint.config.js (Next.js app)
import nextConfig from "@cinesenai-monorepo/eslint-config/next";

export default [
  ...nextConfig,
  // suas configurações adicionais
];
```

**Inclui:**

- Todas as regras do `base.js`
- Next.js specific rules
- React hooks rules
- App Router best practices

### react-internal.js

Configuração para bibliotecas React internas (como `@cinesenai-monorepo/ui`).

**Uso:**

```js
// eslint.config.js (React library)
import reactConfig from "@cinesenai-monorepo/eslint-config/react-internal";

export default [
  ...reactConfig,
  // suas configurações adicionais
];
```

**Inclui:**

- Todas as regras do `base.js`
- React best practices
- Hooks rules
- JSX accessibility rules

## 🚀 Instalação

Este package é workspace-local e é instalado automaticamente:

```json
{
  "devDependencies": {
    "@cinesenai-monorepo/eslint-config": "workspace:*"
  }
}
```

## 💻 Uso

### Em um App Next.js

```js
// apps/cinesenai-next-api/eslint.config.js
import nextConfig from "@cinesenai-monorepo/eslint-config/next";

export default [
  ...nextConfig,
  {
    // Configurações específicas do app
    rules: {
      // Override de regras se necessário
    },
  },
];
```

### Em um App React/Vite

```js
// apps/cinesenai-totem/eslint.config.js
import reactConfig from "@cinesenai-monorepo/eslint-config/react-internal";

export default [
  ...reactConfig,
  {
    ignores: ["dist", "build"],
  },
];
```

### Em um Package

```js
// packages/ui/eslint.config.js
import baseConfig from "@cinesenai-monorepo/eslint-config/base";

export default [
  ...baseConfig,
  {
    // Configurações do package
  },
];
```

## 🏗️ Estrutura

```
eslint-config/
├── base.js              # Configuração base
├── next.js              # Configuração Next.js
├── react-internal.js    # Configuração React interno
├── package.json
└── README.md
```

## 📐 Regras Principais

### TypeScript

- ✅ Strict type checking
- ✅ No unused variables
- ✅ No explicit any (warning)
- ✅ Consistent type imports
- ✅ Prefer interfaces over type aliases (quando aplicável)

### React

- ✅ Hooks rules enforcement
- ✅ No missing key prop
- ✅ Self-closing components
- ✅ No unsafe lifecycle methods
- ✅ Exhaustive deps in useEffect

### Next.js

- ✅ No HTML link for pages
- ✅ No img element (use next/image)
- ✅ No document import in pages
- ✅ Prefer next/script

### Code Quality

- ✅ No console.log (warning)
- ✅ No debugger
- ✅ Prefer const over let
- ✅ No var
- ✅ Consistent quotes (single)

## 🔧 Customização

### Override de Regras

```js
import nextConfig from "@cinesenai-monorepo/eslint-config/next";

export default [
  ...nextConfig,
  {
    rules: {
      // Desabilitar uma regra
      "no-console": "off",

      // Mudar severidade
      "@typescript-eslint/no-explicit-any": "error",

      // Configurar opções
      quotes: ["error", "double"],
    },
  },
];
```

### Ignorar Arquivos

```js
export default [
  ...nextConfig,
  {
    ignores: ["dist", "build", "coverage", "*.config.js", "node_modules"],
  },
];
```

## 🧪 Scripts

### Lint

Adicione ao `package.json` do app:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

### Executar

```bash
# Verificar erros
pnpm lint

# Corrigir automaticamente
pnpm lint:fix
```

## 📊 Integração

### VS Code

Instale a extensão ESLint:

```json
// .vscode/extensions.json
{
  "recommendations": ["dbaeumer.vscode-eslint"]
}
```

Configure para fix on save:

```json
// .vscode/settings.json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### CI/CD

Adicione ao workflow:

```yaml
# .github/workflows/ci.yml
- name: Lint
  run: pnpm lint
```

## ✅ Boas Práticas

1. **Não desabilite regras sem motivo**: Se uma regra está incomodando, provavelmente há um problema real
2. **Use eslint-disable com parcimônia**: Prefira refatorar o código
3. **Documente overrides**: Explique por que uma regra foi modificada
4. **Execute lint antes de commit**: Evite quebrar o CI
5. **Fix automaticamente quando possível**: Use `--fix`

## 🐛 Troubleshooting

### ESLint não está funcionando

```bash
# Verificar instalação
pnpm list eslint

# Reinstalar dependências
pnpm install
```

### Conflito com Prettier

```bash
# Instalar plugin de integração
pnpm add -D eslint-config-prettier
```

```js
// eslint.config.js
import nextConfig from "@cinesenai-monorepo/eslint-config/next";
import prettier from "eslint-config-prettier";

export default [...nextConfig, prettier];
```

### Erros em arquivos gerados

```js
// Ignorar pasta de arquivos gerados
export default [
  ...config,
  {
    ignores: ["packages/types/prisma"],
  },
];
```

## 🔄 Versionamento

- Versão atual: `1.0.0`
- Compatível com ESLint 9+
- Requer TypeScript ESLint 8+

## 📝 Plugins Incluídos

- `@typescript-eslint/eslint-plugin`: Regras TypeScript
- `eslint-plugin-react`: Regras React
- `eslint-plugin-react-hooks`: Regras de Hooks
- `eslint-config-next`: Configuração Next.js (onde aplicável)

## 🤝 Contribuindo

### Adicionar Nova Regra

1. Edite o arquivo de configuração apropriado
2. Teste em um app do monorepo
3. Documente a mudança no README
4. Commit e abra PR

### Guidelines

- Regras devem melhorar qualidade do código
- Evite regras muito restritivas
- Considere o impacto em todo o monorepo
- Documente regras customizadas

## 📄 Licença

Este package é parte do monorepo CineSenai e segue a mesma licença.

## 🔗 Links Úteis

- [ESLint Documentation](https://eslint.org/docs/latest/)
- [TypeScript ESLint](https://typescript-eslint.io/)
- [ESLint Plugin React](https://github.com/jsx-eslint/eslint-plugin-react)
- [Next.js ESLint](https://nextjs.org/docs/app/building-your-application/configuring/eslint)
