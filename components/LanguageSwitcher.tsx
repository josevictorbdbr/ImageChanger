import { useRouter } from "next/router";
import Link from "next/link";

// Agora vive dentro da Sidebar (desktop e mobile), então não tem mais
// posição fixa própria — quem posiciona é o componente pai.
export default function LanguageSwitcher() {
  const { pathname, query, asPath, locale } = useRouter();
  const target = locale === "en" ? "pt-BR" : "en";

  return (
    <Link
      href={{ pathname, query }}
      as={asPath}
      locale={target}
      className="flex w-full items-center justify-center rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
      aria-label={target === "en" ? "Switch to English" : "Mudar para Português"}
    >
      {target === "en" ? "EN" : "PT-BR"}
    </Link>
  );
}
