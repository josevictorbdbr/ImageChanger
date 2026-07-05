import ConversionTool from "../components/ConversionTool";

export default function JpgParaPng() {
  return (
    <ConversionTool
      title="Converter JPG para PNG"
      description="Converta imagens JPG para PNG gratuitamente, direto no navegador, sem enviar seus arquivos para nenhum servidor."
      path="/jpg-para-png"
      toFormat="png"
      faq={[
        {
          question: "O PNG deixa a imagem maior?",
          answer: "Geralmente sim, pois o PNG usa compressão sem perdas, o que resulta em arquivos maiores que o JPG.",
        },
        {
          question: "Ganho transparência ao converter?",
          answer: "Não. Como o JPG não tem canal de transparência, o PNG gerado terá fundo sólido.",
        },
      ]}
    />
  );
}
