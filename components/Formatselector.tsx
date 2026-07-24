import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import Link from "next/link";
import {
  CONVERSIONS,
  ImageFormat,
  findConversionPath,
  getAvailableFormats,
  getAvailableTargets,
} from "../utils/conversions";

const LABELS: Record<ImageFormat, string> = {
  png: "PNG",
  jpg: "JPG",
  webp: "WebP",
};

export default function FormatSelector() {
  const router = useRouter();
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

  const handleConvert = () => {
    if (path) {
      router.push(path);
    }
  };

  return (
    <div className="mx-auto max-w-xl">
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-white p-4 sm:flex-row sm:justify-center sm:p-6">

        <label htmlFor="format-from" className="sr-only">Formato de origem</label>
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
          aria-label="Trocar formatos"
          title="Trocar formatos"
          className="rounded-full border border-border p-2 text-lg text-muted transition hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
        >
          ⇄
        </button>

        <label htmlFor="format-to" className="sr-only">Formato de destino</label>
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
          Ir para conversão
        </button>
      </div>

      <p className="mt-5 mb-2 text-center text-sm font-medium text-ink">
        Conversões rápidas
      </p>

      <nav
        aria-label="Todas as conversões disponíveis"
        className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-muted"
      >
        {CONVERSIONS.map((c) => (
          <Link
            key={c.path}
            href={c.path}
            className="underline underline-offset-2 hover:text-accent"
          >
            {LABELS[c.from]} → {LABELS[c.to]}
          </Link>
        ))}
      </nav>
    </div>
  );
}