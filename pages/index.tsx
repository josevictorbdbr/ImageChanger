import Layout from "../components/Layout";
import SeoHead from "../components/SeoHead";
import ToolCard from "../components/ToolCard";
import { CropIcon, ResizeIcon, CompressIcon, RotateIcon, FlipIcon } from "../components/icons/ToolIcons";

const conversions = [
  { href: "/png-para-jpg", badge: "PNG → JPG", title: "PNG para JPG", description: "Reduza o tamanho do arquivo removendo a transparência." },
  { href: "/jpg-para-png", badge: "JPG → PNG", title: "JPG para PNG", description: "Converta para um formato sem perdas, com suporte a transparência." },
  { href: "/png-para-webp", badge: "PNG → WebP", title: "PNG para WebP", description: "Formato moderno, ideal para a web." },
  { href: "/webp-para-png", badge: "WebP → PNG", title: "WebP para PNG", description: "Compatibilidade máxima com programas antigos." },
  { href: "/jpg-para-webp", badge: "JPG → WebP", title: "JPG para WebP", description: "Menor tamanho, mesma qualidade visual." },
  { href: "/webp-para-jpg", badge: "WebP → JPG", title: "WebP para JPG", description: "Ideal para compartilhar em qualquer app." },
];

const editing = [
  { href: "/cortar-imagem", title: "Cortar imagem", description: "Recorte a área que você quiser manter.", icon: <CropIcon /> },
  { href: "/redimensionar-imagem", title: "Redimensionar imagem", description: "Altere a largura e a altura da imagem.", icon: <ResizeIcon /> },
  { href: "/comprimir-imagem", title: "Comprimir imagem", description: "Diminua o tamanho do arquivo ajustando a qualidade.", icon: <CompressIcon /> },
  { href: "/girar-imagem", title: "Girar imagem", description: "Rotacione em 90°, 180° ou 270°.", icon: <RotateIcon /> },
  { href: "/espelhar-imagem", title: "Espelhar imagem", description: "Inverta horizontalmente ou verticalmente.", icon: <FlipIcon /> },
];

export default function Home() {
  return (
    <Layout>
      <SeoHead
        title="Image Changer — Converta e edite imagens grátis, no navegador"
        description="Converta e edite imagens PNG, JPG e WebP gratuitamente, sem cadastro. Todo o processamento acontece no seu navegador."
        path="/"
      />

      <section className="bg-dot-grid bg-dot-grid border-b border-border">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center">
          <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl">
            Converta e edite imagens.
            <br /> Gratuitamente, sem cadastro.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Ferramentas gratuitas de conversão e edição de imagem, rápidas, sem cadastro e que processam tudo direto
            no seu navegador.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14">
        <h2 className="font-display text-xl font-semibold text-ink">Conversão de formatos</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {conversions.map((tool) => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>

        <h2 className="mt-14 font-display text-xl font-semibold text-ink">Edição de imagens</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {editing.map((tool) => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
