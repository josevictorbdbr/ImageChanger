import ConversionTool from "../components/ConversionTool";
import { useLocale } from "../utils/i18n";
import { webpParaPngText } from "../locales/pages/webp-para-png";

export default function WebpParaPng() {
  const locale = useLocale();
  const t = webpParaPngText[locale];

  return (
    <ConversionTool
      title={t.title}
      description={t.seoDescription}
      path="/webp-para-png"
      toFormat="png"
      aboutTitle={t.aboutTitle}
      about={t.about as unknown as string[]}
    />
  );
}
