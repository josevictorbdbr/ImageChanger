import ConversionTool from "../components/ConversionTool";

export default function WebpParaPng() {
  return (
    <ConversionTool
      title="Converter WebP para PNG"
      description="Converta imagens WebP para PNG gratuitamente, direto no navegador, sem enviar seus arquivos para nenhum servidor."
      path="/webp-para-png"
      toFormat="png"
      faq={[
        {
          question: "Por que converter WebP para PNG?",
          answer: "Alguns programas e sites antigos ainda não têm suporte completo ao WebP, então o PNG garante compatibilidade.",
        },
        {
          question: "Vou perder qualidade?",
          answer: "Não, o PNG é sem perdas, então a qualidade visual é mantida.",
        },
      ]}
    />
  );
}
