import ConversionTool from "../components/ConversionTool";
import { useLocale } from "../utils/i18n";
import { pngParaWebpText } from "../locales/pages/png-para-webp";

export default function PngParaWebp() {
  const locale = useLocale();
  const t = pngParaWebpText[locale];

  return (
    <ConversionTool
      title={t.title}
      description={t.seoDescription}
      path="/png-para-webp"
      toFormat="webp"
      aboutTitle={t.aboutTitle}
      about={t.about as unknown as string[]}
    />
  );
}
