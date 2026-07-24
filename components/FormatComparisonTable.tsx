interface FormatRow {
  format: string;
  transparency: string;
  compression: string;
  bestFor: string;
}

const ROWS: FormatRow[] = [
  {
    format: "PNG",
    transparency: "Sim",
    compression: "Sem perdas",
    bestFor: "Logos, ilustrações e imagens com fundo transparente.",
  },
  {
    format: "JPG",
    transparency: "Não",
    compression: "Com perdas",
    bestFor: "Fotografias e imagens complexas com menor tamanho de arquivo.",
  },
  {
    format: "WebP",
    transparency: "Sim",
    compression: "Alta eficiência",
    bestFor: "Imagens otimizadas para sites e a web moderna.",
  },
];

export default function FormatComparisonTable() {
  return (
    <section>
      <h2 className="text-center font-display text-xl font-semibold text-ink">Comparação entre formatos</h2>
      <p className="mt-2 text-center text-sm text-muted">
        Não sabe qual formato escolher? Veja as principais diferenças entre PNG, JPG e WebP.
      </p>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
          <caption className="sr-only">
            Comparação de suporte a transparência, tipo de compressão e melhor uso por formato de imagem
          </caption>
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="px-4 py-3 font-display font-semibold text-ink">
                Formato
              </th>
              <th scope="col" className="px-4 py-3 font-display font-semibold text-ink">
                Transparência
              </th>
              <th scope="col" className="px-4 py-3 font-display font-semibold text-ink">
                Compressão
              </th>
              <th scope="col" className="px-4 py-3 font-display font-semibold text-ink">
                Melhor uso
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, i) => (
              <tr key={row.format} className={i !== ROWS.length - 1 ? "border-b border-border" : ""}>
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
