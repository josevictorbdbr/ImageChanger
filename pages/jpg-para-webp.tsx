import ConversionTool from "../components/ConversionTool";

export default function JpgParaWebp() {
  return (
    <ConversionTool
      title="Converter JPG para WebP"
      description="Converta imagens JPG para WebP gratuitamente, direto no navegador, sem enviar seus arquivos para nenhum servidor."
      path="/jpg-para-webp"
      toFormat="webp"
      faq={[
        {
          question: "O WebP deixa o arquivo menor que o JPG?",
          answer: "Na maioria dos casos sim, o WebP costuma gerar arquivos bem menores mantendo qualidade similar.",
        },
        {
          question: "Todos os navegadores suportam WebP?",
          answer: "Sim, os navegadores modernos (Chrome, Firefox, Safari, Edge) já suportam o formato.",
        },
      ]}
    />
  );
}
