/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["pt-BR", "en"],
    defaultLocale: "pt-BR",
    localeDetection: false,
  },
  async redirects() {
    return [
      // As 5 páginas de edicao antigas viram redirect permanente para a nova pagina inicial
      { source: "/cortar-imagem", destination: "/editar-imagem?ferramenta=cortar", permanent: true },
      { source: "/redimensionar-imagem", destination: "/editar-imagem?ferramenta=redimensionar", permanent: true },
      { source: "/comprimir-imagem", destination: "/editar-imagem?ferramenta=comprimir", permanent: true },
      { source: "/girar-imagem", destination: "/editar-imagem?ferramenta=girar", permanent: true },
      { source: "/espelhar-imagem", destination: "/editar-imagem?ferramenta=espelhar", permanent: true },
    ];
  },
};

module.exports = nextConfig;
