import ConversionTool from "../components/ConversionTool";
import { useLocale } from "../utils/i18n";
import { webpParaJpgText } from "../locales/pages/webp-para-jpg";

export default function WebpParaJpg() {
  const locale = useLocale();
  const t = webpParaJpgText[locale];

  return (
    <ConversionTool
      title={t.title}
      description={t.seoDescription}
      path="/webp-para-jpg"
      toFormat="jpg"
      aboutTitle={t.aboutTitle}
      about={t.about as unknown as string[]}
    />
  );
}
