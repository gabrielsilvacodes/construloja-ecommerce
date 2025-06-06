# Construloja E-commerce

Aplicação de e-commerce para materiais de construção desenvolvida com **Next.js**, **TypeScript**, **Tailwind CSS** e **HeroUI (NextUI)**. A aplicação simula um processo completo de navegação, autenticação e compra de produtos, com consumo da API [FakeStore](https://fakestoreapi.com) e autenticação via Firebase.

## 🔗 Links

- 💻 [Deploy na Vercel](https://construloja-ecommerce.vercel.app)
- 📁 [Repositório GitHub](https://github.com/gabrielsilvacodes/construloja-ecommerce)

## 🚀 Tecnologias

- **Next.js (App Router)** — Roteamento moderno com suporte a layouts e páginas dinâmicas.
- **TypeScript** — Tipagem estática para maior segurança.
- **Tailwind CSS** — Estilização utilitária com tema customizado.
- **HeroUI (NextUI)** — Componentes prontos e acessíveis.
- **Firebase Auth** — Autenticação de usuários.
- **FakeStore API** — Dados simulados de produtos.

## 📦 Funcionalidades

- Página inicial com banner, categorias e produtos em destaque
- Página dinâmica de detalhes do produto (`/produtos/[id]`)
- Página de login e cadastro simulando autenticação com Firebase
- Página de carrinho com controle de quantidade e exclusão
- Checkout com formulário de dados e simulação de pedido
- Página de pedidos realizados persistidos via localStorage
- Página de contato simulada
- Layout fixo com `layout.tsx`
- Arquivos `loading.tsx` e `error.tsx` personalizados

## 📁 Estrutura Simplificada

```
📦 src
├── app
│   ├── produtos/[id]/page.tsx         # Página dinâmica de produto
│   ├── meus-pedidos/page.tsx          # Listagem de pedidos
│   ├── carrinho/page.tsx              # Página do carrinho
│   ├── checkout/page.tsx              # Finalização de compra
│   ├── login/page.tsx                 # Login do usuário
│   ├── cadastro/page.tsx              # Cadastro do usuário
│   ├── pedido-finalizado/page.tsx     # Confirmação do pedido
│   ├── layout.tsx                     # Layout persistente
│   ├── loading.tsx                    # Tela de carregamento global
│   └── error.tsx                      # Página de erro global
├── components
│   ├── home/                         # Seções da homepage
│   ├── product/CardProduto.tsx       # Card de produto
│   └── layout/Header/Footer.tsx      # Cabeçalho e rodapé
├── context
│   ├── AuthContext.tsx               # Autenticação
│   └── CarrinhoContext.tsx           # Carrinho de compras
├── services/fakeStore.ts             # Comunicação com API FakeStore
├── lib/firebaseConfig.ts             # Configuração do Firebase
└── styles/globals.css                # Estilos globais com Tailwind
```

## ▶️ Como Rodar Localmente

```bash
git clone https://github.com/gabrielsilvacodes/construloja-ecommerce
cd construloja-ecommerce
npm install
npm run dev
```

Desenvolvido por [Gabriel Silva](https://github.com/gabrielsilvacodes) 🚀
