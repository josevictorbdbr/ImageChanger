import { FaqItem } from "./FaqList";
import { useLocale } from "../utils/i18n";
import { common } from "../locales/common";

interface FaqAccordionProps {
  items: FaqItem[];
  title?: string;
}

export default function FaqAccordion({ items, title }: FaqAccordionProps) {
  const locale = useLocale();
  const resolvedTitle = title ?? common[locale].faqTitle;

  return (
    <section>
      <h2 className="text-center font-display text-xl font-semibold text-ink">{resolvedTitle}</h2>
      <div className="mt-4 divide-y divide-border">
        {items.map((item) => (
          <details key={item.question} className="group py-5 first:pt-0 last:pb-0">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink [&::-webkit-details-marker]:hidden">
              {item.question}
              <span aria-hidden="true" className="shrink-0 text-lg text-muted transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm text-muted">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
