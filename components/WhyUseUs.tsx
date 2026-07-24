import { LockIcon, TagIcon, BoltIcon, LayersIcon } from "./icons/InfoIcons";
import { ReactNode } from "react";

interface Highlight {
  icon: ReactNode;
  title: string;
  description: string;
}

const HIGHLIGHTS: Highlight[] = [
  {
    icon: <LockIcon />,
    title: "Privacidade total",
    description: "O processamento acontece via Canvas e APIs do navegador. Nenhuma imagem é enviada para servidores.",
  },
  {
    icon: <TagIcon />,
    title: "Gratuito e sem cadastro",
    description: "Acesso direto a todas as ferramentas, sem precisar criar conta ou fazer login.",
  },
  {
    icon: <BoltIcon />,
    title: "Velocidade máxima",
    description: "Sem filas de upload ou download: o processamento depende só do seu dispositivo.",
  },
  {
    icon: <LayersIcon />,
    title: "Ferramentas integradas",
    description: "Converta, corte, redimensione, comprima, gire e espelhe imagens em um só lugar.",
  },
];

export default function WhyUseUs() {
  return (
    <section>
      <h2 className="text-center font-display text-xl font-semibold text-ink">Por que usar o Image Changer?</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {HIGHLIGHTS.map((item) => (
          <div key={item.title} className="rounded-2xl border border-border bg-white p-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
              {item.icon}
            </span>
            <h3 className="mt-3 font-display text-base font-semibold text-ink">{item.title}</h3>
            <p className="mt-1 text-sm text-muted">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
