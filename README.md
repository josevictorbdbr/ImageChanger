# Image Changer

Conversão e edição básica de imagens, sem cadastro, sem backend, com todo o processamento
acontecendo no navegador do usuário (via Canvas API).

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse http://localhost:3000

## Estrutura

```
components/   Componentes de UI reutilizáveis (Layout, DropZone, ConversionTool...)
pages/        Uma página por rota (SEO amigável) — próximo router
tools/        Lógica pura de processamento de imagem (canvas), sem UI
hooks/        Hooks de estado compartilhado (ex: useImageFile)
utils/        Funções auxiliares genéricas (download, formatação)
styles/       CSS global e configuração do Tailwind
```

## Como adicionar uma nova ferramenta de conversão

As 6 ferramentas de conversão de formato (PNG/JPG/WebP) usam o mesmo componente
`components/ConversionTool.tsx`. Para adicionar uma nova combinação, basta criar uma
página em `pages/` reaproveitando esse componente, como em `pages/png-para-jpg.tsx`.

## Como adicionar uma nova ferramenta de edição

1. Escreva a lógica pura em `tools/imageEditor.ts` (recebe `File`, devolve `Blob`).
2. Crie a página em `pages/` com `DropZone` + controles específicos da ferramenta.

## Próximos passos sugeridos

- Seleção visual de área na ferramenta de cortar imagem (ex: `react-easy-crop`).
- Testes automatizados para as funções em `tools/`.
- Integração do Google AdSense (posicionamento discreto, sem prejudicar UX).
- Sitemap.xml e robots.txt para SEO.
