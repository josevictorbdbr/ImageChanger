import ConversionTool from "../components/ConversionTool";

export default function WebpParaJpg() {
  return (
    <ConversionTool
      title="Converter WebP para JPG"
      description="Converta imagens WebP para JPG gratuitamente, direto no navegador, sem enviar seus arquivos para nenhum servidor."
      path="/webp-para-jpg"
      toFormat="jpg"
      faq={[
        {
          question: "Por que converter WebP para JPG?",
          answer: "O JPG tem suporte universal, o que facilita o compartilhamento em qualquer app ou dispositivo.",
        },
        {
          question: "A imagem perde qualidade?",
          answer: "Pode haver uma leve perda, já que o JPG usa compressão com perdas, mas geralmente é imperceptível.",
        },
      ]}
    />
  );
}
