# CineSenai Totem

Interface de autoatendimento para compra de ingressos de cinema. Aplicação React moderna construída com Vite, TypeScript, Tailwind CSS e Radix UI, projetada para funcionar em totens de autoatendimento.

## 🚀 Tecnologias

- **Framework**: React 19 + Vite 4
- **Linguagem**: TypeScript 5.8+
- **Roteamento**: TanStack Router 1.120+
- **Estado Global**: Jotai 2.12
- **UI Framework**: Tailwind CSS 4 + Radix UI
- **Animações**: Framer Motion 12
- **Ícones**: Lucide React + Font Awesome
- **QR Code**: react-qr-code
- **Utilitários**: clsx, tailwind-merge, class-variance-authority

## 📋 Pré-requisitos

- Node.js 18+
- pnpm 9.0+
- API CineSenai rodando (veja `../cinesenai-next-api`)

## ⚙️ Configuração

1. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

2. Atualize o arquivo `.env`:

```env
VITE_API_URL=http://localhost:3001
```

3. Instale as dependências (do root do monorepo):

```bash
pnpm install
```

## 🔧 Desenvolvimento

Inicie o servidor de desenvolvimento:

```bash
pnpm dev
```

A aplicação estará disponível em `http://localhost:5173`

### Hot Module Replacement (HMR)

O Vite fornece HMR extremamente rápido. Mudanças no código são refletidas instantaneamente no navegador.

## 📦 Build

Gere o build de produção:

```bash
pnpm build
```

Os arquivos otimizados serão gerados em `dist/`

### Preview do Build

Para testar o build de produção localmente:

```bash
pnpm preview
```

## 🎨 Funcionalidades

### Fluxo do Usuário

1. **Home Page**: Tela inicial com boas-vindas
2. **Filmes Page**: Lista de filmes em cartaz
3. **Filme Detalhes**: Informações detalhadas do filme selecionado
4. **Sessão Detalhes**: Escolha de sessão e seleção de assentos
5. **Checkout**: Confirmação e pagamento
6. **Ingresso**: Exibição do ingresso com QR Code

### Componentes Principais

- **FilmeCard**: Card de filme com poster e informações
- **SessaoCard**: Card de sessão com horário e disponibilidade
- **Assento**: Componente interativo de assento
- **BotaoNavegacao**: Botões de navegação entre páginas
- **ClassificacaoIndicativa**: Badge de classificação etária

### Estado Global (Jotai)

O estado da aplicação é gerenciado com Jotai através de atoms:

- Filme selecionado
- Sessão selecionada
- Assentos selecionados
- Carrinho de compras
- Configurações do tema

## 🗂️ Estrutura do Projeto

```
cinesenai-totem/
├── src/
│   ├── main.tsx               # Entry point + Router setup
│   ├── index.css              # Estilos globais
│   │
│   ├── pages/                 # Páginas da aplicação
│   │   ├── home-page.tsx
│   │   ├── filmes-page.tsx
│   │   ├── filme-detalhes-page.tsx
│   │   ├── sessao-detalhes-page.tsx
│   │   ├── checkout-page.tsx
│   │   └── ingresso-page.tsx
│   │
│   ├── components/            # Componentes React
│   │   ├── assento.tsx
│   │   ├── botao-navegacao.tsx
│   │   ├── classificacao-inditicativa.tsx
│   │   ├── filme-card.tsx
│   │   ├── sessao-card.tsx
│   │   ├── theme-provider.tsx
│   │   └── ui/                # Componentes Radix UI
│   │       ├── alert-dialog.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── label.tsx
│   │       ├── separator.tsx
│   │       └── switch.tsx
│   │
│   ├── atoms/                 # Jotai atoms (estado global)
│   │   └── app-atom.tsx
│   │
│   ├── enums/                 # Enumerações TypeScript
│   │   └── ...
│   │
│   └── lib/                   # Utilitários
│       ├── utils.ts
│       └── extensions/
│
├── assets/
│   └── images/                # Imagens e recursos
│
├── public/                    # Arquivos públicos
│
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
└── package.json
```

## 🎨 Temas

A aplicação suporta tema claro e escuro:

- Troca automática baseada nas preferências do sistema
- Troca manual via switch no UI
- Persistência da escolha do usuário

## 🔌 Integração com API

A aplicação consome a API CineSenai para:

- Buscar filmes em cartaz
- Obter detalhes de filmes
- Listar sessões disponíveis
- Verificar disponibilidade de assentos
- Criar ingressos (compra)

Todas as requisições são feitas para `VITE_API_URL` configurado no `.env`

## 📱 Responsividade

A interface é otimizada para:

- Totens touchscreen (1080x1920)
- Tablets
- Desktop (desenvolvimento)

## 🧩 Integração com Monorepo

Este app utiliza os seguintes packages compartilhados:

- **@cinesenai-monorepo/types**: Types do Prisma
- **@cinesenai-monorepo/types-custom**: Types customizados da API
- **@cinesenai-monorepo/eslint-config**: Configurações ESLint
- **@cinesenai-monorepo/typescript-config**: Configurações TypeScript

## 🎯 Rotas

Configuradas com TanStack Router:

- `/` - Home (página inicial)
- `/filmes` - Lista de filmes
- `/filme/:id` - Detalhes do filme
- `/sessao/:id` - Detalhes da sessão e seleção de assentos
- `/checkout` - Finalização da compra
- `/ingresso/:id` - Visualização do ingresso

## 🚀 Performance

- **Vite Build**: Build extremamente rápido
- **Code Splitting**: Carregamento lazy de rotas
- **Tree Shaking**: Remoção de código não utilizado
- **Minificação**: Código otimizado e comprimido
- **Asset Optimization**: Otimização de imagens

## 🧪 Linting

```bash
# Executar ESLint
pnpm lint
```

Configuração ESLint estende:

- `eslint:recommended`
- `typescript-eslint`
- `react-hooks`
- `react-refresh`

## 🎨 Customização de UI

### Tailwind CSS

A aplicação usa Tailwind CSS 4 com configuração customizada para:

- Cores do tema CineSenai
- Breakpoints para totem
- Animações customizadas
- Plugins: `@tailwindcss/vite`, `tw-animate-css`

### Radix UI

Componentes acessíveis e sem estilo pré-definido:

- Alert Dialog
- Label
- Separator
- Switch
- Slot

Estilizados com Tailwind CSS via `class-variance-authority`

## 🔧 Ferramentas de Desenvolvimento

### Vite DevTools

Desenvolvimento rápido com:

- HMR instantâneo
- Error overlay
- Source maps

### TypeScript

Type checking estrito habilitado:

```bash
# Verificar tipos
pnpm tsc --noEmit
```

## 📐 Design System

A aplicação segue um design system consistente:

- **Cores**: Paleta definida no Tailwind config
- **Tipografia**: System fonts otimizadas
- **Espaçamento**: Escala consistente (4px base)
- **Componentes**: Reutilizáveis e composáveis
- **Animações**: Suaves e performáticas

## 🐛 Debugging

### Vite Debug

```bash
DEBUG=vite:* pnpm dev
```

### React DevTools

Instale a extensão React DevTools no navegador para:

- Inspecionar componentes
- Analisar estado
- Profiling de performance

## 🚢 Deploy

### Build para Produção

```bash
pnpm build
```

### Deploy em Servidor Static

O conteúdo de `dist/` pode ser servido por qualquer servidor de arquivos estáticos:

- Vercel
- Netlify
- AWS S3 + CloudFront
- Nginx
- Apache

### Configuração de Servidor

Para suportar client-side routing, configure fallback para `index.html`:

**Nginx exemplo:**

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**Vercel exemplo (vercel.json):**

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

## 🔐 Segurança

- Validação de inputs
- Sanitização de dados da API
- HTTPS obrigatório em produção
- CSP headers recomendados

## 📝 Boas Práticas

1. **Componentes**: Pequenos, focados e reutilizáveis
2. **Estado**: Mínimo e localizado quando possível
3. **Performance**: Lazy loading e code splitting
4. **Acessibilidade**: Semântica HTML e ARIA labels
5. **TypeScript**: Types estritos, evite `any`

## 🤝 Contribuindo

1. Crie uma branch para sua feature
2. Siga os padrões de código (ESLint)
3. Mantenha componentes pequenos e testáveis
4. Documente novas funcionalidades
5. Atualize os types quando necessário

## 📞 Suporte

Para questões e suporte, consulte a documentação principal do monorepo ou abra uma issue no repositório.

## 🔗 Links Úteis

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [TanStack Router](https://tanstack.com/router)
- [Jotai Documentation](https://jotai.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)
  ...reactDom.configs.recommended.rules,
  },
  })

```

```
