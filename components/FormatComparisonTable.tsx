import { useLocale } from "../utils/i18n";
import { formatComparisonText } from "../locales/formatComparisonTable";

export default function FormatComparisonTable() {
  const locale = useLocale();
  const t = formatComparisonText[locale];

  return (
    <section>
      <h2 className="text-center font-display text-xl font-semibold text-ink">{t.title}</h2>
      <p className="mt-2 text-center text-sm text-muted">{t.subtitle}</p>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
          <caption className="sr-only">{t.caption}</caption>
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="px-4 py-3 font-display font-semibold text-ink">
                {t.colFormat}
              </th>
              <th scope="col" className="px-4 py-3 font-display font-semibold text-ink">
                {t.colTransparency}
              </th>
              <th scope="col" className="px-4 py-3 font-display font-semibold text-ink">
                {t.colCompression}
              </th>
              <th scope="col" className="px-4 py-3 font-display font-semibold text-ink">
                {t.colBestFor}
              </th>
            </tr>
          </thead>
          <tbody>
            {t.rows.map((row, i) => (
              <tr key={row.format} className={i !== t.rows.length - 1 ? "border-b border-border" : ""}>
                <th scope="row" className="px-4 py-3 font-medium text-ink">
                  {row.format}
                </th>
                <td className="px-4 py-3 text-muted">{row.transparency}</td>
                <td className="px-4 py-3 text-muted">{row.compression}</td>
                <td className="px-4 py-3 text-muted">{row.bestFor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
