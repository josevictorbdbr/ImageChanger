import { useState } from "react";
import { useLocale } from "../utils/i18n";
import { common } from "../locales/common";

//Mande o pix
const EMAIL = "f2aca944-c86a-4642-9368-24127dfaee56";

export default function CoffeeButton() {
  const locale = useLocale();
  const t = common[locale];
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="hover:text-accent">
        {t.coffeeButton}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-lg">
            <p className="text-2xl">☕</p>
            <h2 className="mt-2 font-display text-lg font-semibold text-ink">{t.coffeeThanks}</h2>
            <p className="mt-2 text-sm text-muted">{t.coffeePixNote}</p>
            <p className="mt-2 font-mono text-sm text-accent">{EMAIL}</p>
            <button
              onClick={() => setOpen(false)}
              className="mt-5 rounded-full bg-accent px-5 py-1.5 text-sm font-medium text-white hover:bg-accent-hover"
            >
              {t.coffeeClose}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
