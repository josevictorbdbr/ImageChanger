import Layout from "../components/Layout";
import SeoHead from "../components/SeoHead";
import ToolCard from "../components/ToolCard";
import FormatSelector from "../components/Formatselector";
import HowItWorks from "../components/HowItWorks";
import WhyUseUs from "../components/WhyUseUs";
import FormatComparisonTable from "../components/FormatComparisonTable";
import FaqAccordion from "../components/FaqAccordion";
import { SITE_FAQ } from "../utils/siteFaq";
import { CropIcon, ResizeIcon, CompressIcon, RotateIcon, FlipIcon } from "../components/icons/ToolIcons";

const editing = [
  {
    href: "/cortar-imagem",
    title: "Cortar imagem",
    description: "Recorte a área que você quiser manter.",
    icon: <CropIcon />,
    badge: "Popular",
  },
  {
    href: "/redimensionar-imagem",
    title: "Redimensionar imagem",
    description: "Altere a largura e a altura da imagem.",
    icon: <ResizeIcon />,
  },
  {
    href: "/comprimir-imagem",
    title: "Comprimir imagem",
    description: "Diminua o tamanho do arquivo ajustando a qualidade.",
    icon: <CompressIcon />,
    badge: "Popular",
  },
  {
    href: "/girar-imagem",
    title: "Girar imagem",
    description: "Rotacione em 90°, 180° ou 270°.",
    icon: <RotateIcon />,
  },
  {
    href: "/espelhar-imagem",
    title: "Espelhar imagem",
    description: "Inverta horizontalmente ou verticalmente.",
    icon: <FlipIcon />,
  },
];

export default function Home() {
  return (
    <Layout>
      <SeoHead
        title="Image Changer — Converta e edite imagens grátis, no navegador"
        description="Converta e edite imagens PNG, JPG e WebP gratuitamente, sem cadastro. Todo o processamento acontece no seu navegador."
        path="/"
        faq={SITE_FAQ}
      />

      <section className="bg-dot-grid bg-dot-grid border-b border-border">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center">
          <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl">
            Converta e edite imagens.
            <br /> Gratuitamente, sem login.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Processamento todo no navegador. Suas imagens nunca saem do seu dispositivo.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-14">
        <section>
          <h2 className="text-center font-display text-xl font-semibold text-ink">Conversão de formatos</h2>
          <div className="mt-5">
            <FormatSelector />
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-center font-display text-xl font-semibold text-ink">Edição de imagens</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {editing.map((tool) => (
              <ToolCard key={tool.href} {...tool} />
            ))}
          </div>
        </section>

        <div className="mt-20">
          <HowItWorks />
        </div>

        <div className="mt-20">
          <WhyUseUs />
        </div>

        <div className="mt-20">
          <FaqAccordion items={SITE_FAQ} />
        </div>
      </div>
    </Layout>
  );
}
