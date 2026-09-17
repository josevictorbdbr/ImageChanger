import { useRouter } from "next/router";

export type Locale = "pt-BR" | "en";

// Hook unico para toda a tradução do site
export function useLocale(): Locale {
  const { locale } = useRouter();
  return locale === "en" ? "en" : "pt-BR";
}
