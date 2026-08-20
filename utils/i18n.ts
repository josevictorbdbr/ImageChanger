import { useRouter } from "next/router";

export type Locale = "pt-BR" | "en";

// Hook único para toda a tradução do site: lê o locale atual da rota
// (definido pelo next.config.js) e normaliza para "pt-BR" | "en".
export function useLocale(): Locale {
  const { locale } = useRouter();
  return locale === "en" ? "en" : "pt-BR";
}
