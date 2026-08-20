import { useLocale } from "../utils/i18n";
import { howItWorksText } from "../locales/howItWorks";

export default function HowItWorks() {
  const locale = useLocale();
  const t = howItWorksText[locale];

  return (
    <section>
      <h2 className="text-center font-display text-xl font-semibold text-ink">{t.title}</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {t.steps.map((step) => (
          <div key={step.number} className="rounded-2xl border border-border bg-white p-5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-paper font-mono text-sm font-semibold text-ink">
              {step.number}
            </span>
            <h3 className="mt-3 font-display text-base font-semibold text-ink">{step.title}</h3>
            <p className="mt-1 text-sm text-muted">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
