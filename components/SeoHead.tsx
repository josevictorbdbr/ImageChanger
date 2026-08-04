import Head from "next/head";
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
  const url = `${SITE_URL}${path}`;
  const fullTitle = path === "/" ? title : `${title} | ${SITE_NAME}`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
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