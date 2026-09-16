import Layout from "../components/Layout";
import SeoHead from "../components/SeoHead";
import FaqAccordion from "../components/FaqAccordion";
import { SITE_FAQ } from "../utils/siteFaq";
import { editarImagemText } from "../locales/pages/editar-imagem";
import { useLocale } from "../utils/i18n";
import { perguntasFrequentesText } from "../locales/pages/perguntas-frequentes";

// Junta o FAQ geral do site (antes na home) com o FAQ das ferramentas de
// edição (antes em UnifiedEditor) numa única página, sempre no estilo
// accordion (FaqAccordion) — o mesmo que já era usado no conversor.
export default function PerguntasFrequentes() {
  const locale = useLocale();
  const t = perguntasFrequentesText[locale];
  const faq = [...SITE_FAQ[locale], ...editarImagemText[locale].faq];

  return (
    <Layout>
      <SeoHead title={t.seoTitle} description={t.seoDescription} path="/perguntas-frequentes" faq={faq} />

      <section className="bg-dot-grid bg-dot-grid border-b border-border">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center">
          <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl">{t.heroTitle}</h1>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-14">
        <FaqAccordion items={faq} />
      </div>
    </Layout>
  );
}
