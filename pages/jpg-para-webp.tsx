import ConversionTool from "../components/ConversionTool";
import { useLocale } from "../utils/i18n";
import { jpgParaWebpText } from "../locales/pages/jpg-para-webp";

export default function JpgParaWebp() {
  const locale = useLocale();
  const t = jpgParaWebpText[locale];

  return (
    <ConversionTool
      title={t.title}
      description={t.seoDescription}
      path="/jpg-para-webp"
      toFormat="webp"
      aboutTitle={t.aboutTitle}
      about={t.about as unknown as string[]}
    />
  );
}
