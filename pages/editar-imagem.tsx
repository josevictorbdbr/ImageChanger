import Layout from "../components/Layout";
import SeoHead from "../components/SeoHead";
import UnifiedEditor from "../components/UnifiedEditor";
import { useLocale } from "../utils/i18n";
import { editarImagemText } from "../locales/pages/editar-imagem";

export default function EditarImagem() {
  const locale = useLocale();
  const t = editarImagemText[locale];

  return (
    <Layout>
      <SeoHead title={t.seoTitle} description={t.seoDescription} path="/editar-imagem" faq={t.faq} />

      <section className="bg-dot-grid bg-dot-grid border-b border-border">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center">
          <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl">{t.heroTitle}</h1>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-4 py-10">
        <UnifiedEditor />
      </section>
    </Layout>
  );
}
