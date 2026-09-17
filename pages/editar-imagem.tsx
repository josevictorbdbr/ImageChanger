import Layout from "../components/Layout";
import SeoHead from "../components/SeoHead";
import PageHero from "../components/PageHero";
import UnifiedEditor from "../components/UnifiedEditor";
import { useLocale } from "../utils/i18n";
import { editarImagemText } from "../locales/pages/editar-imagem";

export default function EditarImagem() {
  const locale = useLocale();
  const t = editarImagemText[locale];

  return (
    <Layout>
      <SeoHead title={t.seoTitle} description={t.seoDescription} path="/editar-imagem" faq={t.faq} />

      <PageHero title={t.heroTitle} />

      <section className="mx-auto max-w-2xl px-4 py-10">
        <UnifiedEditor />
      </section>
    </Layout>
  );
}
