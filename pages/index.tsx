import Layout from "../components/Layout";
import SeoHead from "../components/SeoHead";
import PageHero from "../components/PageHero";
import UnifiedConverter from "../components/UnifiedConverter";
import { useLocale } from "../utils/i18n";
import { converterFormatoText } from "../locales/pages/index";

export default function ConverterFormato() {
  const locale = useLocale();
  const t = converterFormatoText[locale];

  return (
    <Layout>
      <SeoHead title={t.seoTitle} description={t.seoDescription} path="/" />

      <PageHero title={t.heroTitle} />

      <div className="mx-auto max-w-5xl px-4 py-14">
        <UnifiedConverter />
      </div>
    </Layout>
  );
}
