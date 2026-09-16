/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["pt-BR", "en"],
    defaultLocale: "pt-BR",
    // desativado de propósito: a troca de idioma é manual, via LanguageSwitcher,
    // para não redirecionar visitantes ou bots do Google com base no Accept-Language
    localeDetection: false,
  },
  async redirects() {
    return [
      // As 5 páginas de edição antigas viram redirect permanente para a nova
      // página unificada, já pré-selecionando a ferramenta certa via query param.
      // O Next aplica o prefixo de locale automaticamente (ex: /en/cortar-imagem
      // -> /en/editar-imagem?ferramenta=cortar), não precisa tratar isso à mão.
      { source: "/cortar-imagem", destination: "/editar-imagem?ferramenta=cortar", permanent: true },
      { source: "/redimensionar-imagem", destination: "/editar-imagem?ferramenta=redimensionar", permanent: true },
      { source: "/comprimir-imagem", destination: "/editar-imagem?ferramenta=comprimir", permanent: true },
      { source: "/girar-imagem", destination: "/editar-imagem?ferramenta=girar", permanent: true },
      { source: "/espelhar-imagem", destination: "/editar-imagem?ferramenta=espelhar", permanent: true },
    ];
  },
};

module.exports = nextConfig;
