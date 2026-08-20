import { useRouter } from "next/router";
import Link from "next/link";

// Botão fixo de troca de idioma. Usa o locale routing nativo do Next
// (next.config.js) para trocar entre pt-BR e en mantendo a página atual
// (ex: /cortar-imagem <-> /en/cortar-imagem).
export default function LanguageSwitcher() {
  const { pathname, query, asPath, locale } = useRouter();
  const target = locale === "en" ? "pt-BR" : "en";

  return (
    <Link
      href={{ pathname, query }}
      as={asPath}
      locale={target}
      className="fixed bottom-4 right-4 z-50 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold text-ink shadow-sm transition-colors hover:border-accent hover:text-accent"
      aria-label={target === "en" ? "Switch to English" : "Mudar para Português"}
    >
      {target === "en" ? "EN" : "PT-BR"}
    </Link>
  );
}
