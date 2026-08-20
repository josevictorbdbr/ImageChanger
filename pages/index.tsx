import Layout from "../components/Layout";
import SeoHead from "../components/SeoHead";
import ToolCard from "../components/ToolCard";
import FormatSelector from "../components/Formatselector";
import HowItWorks from "../components/HowItWorks";
import WhyUseUs from "../components/WhyUseUs";
import FaqAccordion from "../components/FaqAccordion";
import { SITE_FAQ } from "../utils/siteFaq";
import { useLocale } from "../utils/i18n";
import { homeText } from "../locales/pages/index";
import { CropIcon, ResizeIcon, CompressIcon, RotateIcon, FlipIcon } from "../components/icons/ToolIcons";

// Ícones não têm idioma, então ficam num array separado, na mesma ordem
// dos itens de locales/pages/index.ts -> editingTools.
const EDITING_ICONS = [<CropIcon key="crop" />, <ResizeIcon key="resize" />, <CompressIcon key="compress" />, <RotateIcon key="rotate" />, <FlipIcon key="flip" />];

export default function Home() {
  const locale = useLocale();
  const t = homeText[locale];
  const faq = SITE_FAQ[locale];

  return (
    <Layout>
      <SeoHead title={t.seoTitle} description={t.seoDescription} path="/" faq={faq} />

      <section className="bg-dot-grid bg-dot-grid border-b border-border">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center">
          <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl">
            {t.heroLine1}
            <br /> {t.heroLine2}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted">{t.heroSubtitle}</p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-14">
        <section>
          <h2 className="text-center font-display text-xl font-semibold text-ink">{t.sectionConversion}</h2>
          <div className="mt-5">
            <FormatSelector />
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-center font-display text-xl font-semibold text-ink">{t.sectionEditing}</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.editingTools.map((tool, i) => (
              <ToolCard key={tool.href} href={tool.href} title={tool.title} description={tool.description} icon={EDITING_ICONS[i]} />
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
          <FaqAccordion items={faq} />
        </div>
      </div>
    </Layout>
  );
}
