import ConversionTool from "../components/ConversionTool";
import { useLocale } from "../utils/i18n";
import { jpgParaPngText } from "../locales/pages/jpg-para-png";

export default function JpgParaPng() {
  const locale = useLocale();
  const t = jpgParaPngText[locale];

  return (
    <ConversionTool
      title={t.title}
      description={t.seoDescription}
      path="/jpg-para-png"
      toFormat="png"
      aboutTitle={t.aboutTitle}
      about={t.about as unknown as string[]}
    />
  );
}
