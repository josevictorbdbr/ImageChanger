interface Step {
  number: string;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    number: "1",
    title: "Escolha a ferramenta",
    description: "Selecione o formato de conversão ou a função de edição desejada.",
  },
  {
    number: "2",
    title: "Selecione suas imagens",
    description: "Arraste os arquivos até a área indicada ou clique para buscar no dispositivo.",
  },
  {
    number: "3",
    title: "Faça os ajustes",
    description: "Configure qualidade, tamanho, corte ou rotação conforme a ferramenta escolhida.",
  },
  {
    number: "4",
    title: "Baixe instantaneamente",
    description: "Receba o resultado processado direto no seu navegador, sem espera.",
  },
];

export default function HowItWorks() {
  return (
    <section>
      <h2 className="text-center font-display text-xl font-semibold text-ink">Como funciona</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step) => (
          <div key={step.number} className="rounded-2xl border border-border bg-white p-5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 font-mono text-sm font-semibold text-accent">
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
