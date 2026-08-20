import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import {
  ImageFormat,
  findConversionPath,
  getAvailableFormats,
  getAvailableTargets,
} from "../utils/conversions";
import { useLocale } from "../utils/i18n";
import { formatSelectorText } from "../locales/formatSelector";

// Nomes de formato (PNG/JPG/WebP) não mudam entre idiomas, então ficam fora do dicionário.
const LABELS: Record<ImageFormat, string> = {
  png: "PNG",
  jpg: "JPG",
  webp: "WebP",
};

export default function FormatSelector() {
  const router = useRouter();
  const locale = useLocale();
  const t = formatSelectorText[locale];
  const formats = useMemo(getAvailableFormats, []);

  const [from, setFrom] = useState<ImageFormat>("png");
  const [to, setTo] = useState<ImageFormat>("jpg");

  const targets = useMemo(() => getAvailableTargets(from), [from]);

  const handleFromChange = (value: ImageFormat) => {
    setFrom(value);

    const options = getAvailableTargets(value);

    if (!options.includes(to)) {
      setTo(options[0]);
    }
  };

  const handleSwap = () => {
    const newFrom = to;
    const newTo = from;

    if (findConversionPath(newFrom, newTo)) {
      setFrom(newFrom);
      setTo(newTo);
    }
  };

  const path = findConversionPath(from, to);
  const swapDisabled = !findConversionPath(to, from);

  // router.push preserva o locale atual automaticamente (comportamento padrão do Next),
  // então não precisa de tratamento extra pra manter o usuário no idioma certo.
  const handleConvert = () => {
    if (path) {
      router.push(path);
    }
  };

  return (
    <div className="mx-auto max-w-xl">
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-white p-4 sm:flex-row sm:justify-center sm:p-6">

        <label htmlFor="format-from" className="sr-only">{t.fromLabel}</label>
        <select
          id="format-from"
          value={from}
          onChange={(e) => handleFromChange(e.target.value as ImageFormat)}
          className="w-32 rounded-lg border border-border px-3 py-2 text-ink focus:border-accent focus:outline-none"
        >
          {formats.map((f) => (
            <option key={f} value={f}>
              {LABELS[f]}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={handleSwap}
          disabled={swapDisabled}
          aria-label={t.swapAria}
          title={t.swapAria}
          className="rounded-full border border-border p-2 text-lg text-muted transition hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
        >
          ⇄
        </button>

        <label htmlFor="format-to" className="sr-only">{t.toLabel}</label>
        <select
          id="format-to"
          value={to}
          onChange={(e) => setTo(e.target.value as ImageFormat)}
          className="w-32 rounded-lg border border-border px-3 py-2 text-ink focus:border-accent focus:outline-none"
        >
          {targets.map((f) => (
            <option key={f} value={f}>
              {LABELS[f]}
            </option>
          ))}
        </select>

        <button
          onClick={handleConvert}
          disabled={!path}
          className="w-full rounded-full bg-accent px-6 py-2 font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-50 sm:w-auto"
        >
          {t.convertButton}
        </button>
      </div>

    </div>
  );
}
