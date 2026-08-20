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
};

module.exports = nextConfig;
