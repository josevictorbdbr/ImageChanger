import Head from "next/head";
import { useRouter } from "next/router";
import { SITE_URL, SITE_NAME } from "../utils/siteConfig";

interface FaqItem {
  question: string;
  answer: string;
}

interface SeoHeadProps {
  title: string;
  description: string;
  path: string;
  faq?: FaqItem[];
  noindex?: boolean;
}

export default function SeoHead({ title, description, path, faq, noindex }: SeoHeadProps) {
  const { locale } = useRouter();
  const currentLocale = locale === "en" ? "en" : "pt-BR";

  // path já vem sem prefixo de idioma (ex: "/jpg-para-png" ou "/").
  // A versão en é sempre a mesma rota com /en na frente.
  const ptUrl = `${SITE_URL}${path}`;
  const enUrl = path === "/" ? `${SITE_URL}/en` : `${SITE_URL}/en${path}`;
  const url = currentLocale === "en" ? enUrl : ptUrl;

  const fullTitle = path === "/" ? title : `${title} | ${SITE_NAME}`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="pt-BR" href={ptUrl} />
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="x-default" href={ptUrl} />
      {noindex && <meta name="robots" content="noindex" />}

      {/* Meta Tag para identificar o nome da marca */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />

      {/* Injeta o Schema de WebSite na página inicial para definir o Nome do Site no Google */}
      {path === "/" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: SITE_NAME,
              alternateName: "Image Changer",
              url: SITE_URL,
            }),
          }}
        />
      )}

      {faq && faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faq.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
              })),
            }),
          }}
        />
      )}
    </Head>
  );
}