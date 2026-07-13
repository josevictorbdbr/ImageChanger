import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export type AdPosition = "home-below-hero" | "home-between-sections" | "tool-below-editor" | "tool-above-faq";

// Passo 1 (após aprovação no AdSense): troque para true.
const ADSENSE_ENABLED = false;

const AD_CLIENT = "ca-pub-8253287126741398";

// Passo 2: cole aqui o "data-ad-slot" de cada unidade de anúncio criada no painel do AdSense.
// Não é necessário mexer em nenhuma página — só neste mapa.
const AD_SLOTS: Record<AdPosition, string> = {
  "home-below-hero": "",
  "home-between-sections": "",
  "tool-below-editor": "",
  "tool-above-faq": "",
};

interface AdBannerProps {
  position: AdPosition;
  className?: string;
}

export default function AdBanner({ position, className = "" }: AdBannerProps) {
  const slot = AD_SLOTS[position];
  const shouldRender = ADSENSE_ENABLED && slot !== "";

  useEffect(() => {
    if (!shouldRender) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // adsbygoogle ainda não carregou; sem problema, não quebra a página
    }
  }, [shouldRender]);

  if (!shouldRender) return null;

  return (
    <div className={`mx-auto w-full max-w-5xl px-4 ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
