import { LockIcon, TagIcon, InfinityIcon, LayersIcon } from "./icons/InfoIcons";
import { useLocale } from "../utils/i18n";
import { whyUseUsText } from "../locales/whyUseUs";

// Ícones não têm idioma, então ficam num array separado, na mesma ordem
// dos itens de locales/whyUseUs.ts.
const ICONS = [<LockIcon key="lock" />, <TagIcon key="tag" />, <InfinityIcon key="infinity" />, <LayersIcon key="layers" />];

export default function WhyUseUs() {
  const locale = useLocale();
  const t = whyUseUsText[locale];

  return (
    <section>
      <h2 className="text-center font-display text-xl font-semibold text-ink">{t.title}</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {t.highlights.map((item, i) => (
          <div key={item.title} className="rounded-2xl border border-border bg-white p-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-paper text-ink">
              {ICONS[i]}
            </span>
            <h3 className="mt-3 font-display text-base font-semibold text-ink">{item.title}</h3>
            <p className="mt-1 text-sm text-muted">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
