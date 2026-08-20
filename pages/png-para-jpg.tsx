import ConversionTool from "../components/ConversionTool";
import { useLocale } from "../utils/i18n";
import { pngParaJpgText } from "../locales/pages/png-para-jpg";

export default function PngParaJpg() {
  const locale = useLocale();
  const t = pngParaJpgText[locale];

  return (
    <ConversionTool
      title={t.title}
      description={t.seoDescription}
      path="/png-para-jpg"
      toFormat="jpg"
      aboutTitle={t.aboutTitle}
      about={t.about as unknown as string[]}
    />
  );
}
