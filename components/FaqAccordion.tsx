import { FaqItem } from "./FaqList";

interface FaqAccordionProps {
  items: FaqItem[];
  title?: string;
}

// Acordeão semântico (details/summary) para conteúdo de FAQ genérico.
// Distinto de FaqList.tsx, que usa dl/dt/dd para a FAQ específica de cada ferramenta.
export default function FaqAccordion({ items, title = "Perguntas frequentes" }: FaqAccordionProps) {
  return (
    <section>
      <h2 className="text-center font-display text-xl font-semibold text-ink">{title}</h2>
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
