const BENEFITS = [
  "Processamento 100% local",
  "Conversão em lote (até 5 imagens)",
  "Compatível com computador e celular",
  "Sem envio das imagens para servidores",
];

export default function BenefitsList() {
  return (
    <ul className="mx-auto mt-6 flex max-w-xl flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-6 sm:gap-y-2">
      {BENEFITS.map((benefit) => (
        <li key={benefit} className="flex items-center gap-2 text-sm text-muted">
          <span className="text-success" aria-hidden="true">
            ✓
          </span>
          {benefit}
        </li>
      ))}
    </ul>
  );
}
