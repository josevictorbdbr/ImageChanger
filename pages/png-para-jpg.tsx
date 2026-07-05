import ConversionTool from "../components/ConversionTool";

export default function PngParaJpg() {
  return (
    <ConversionTool
      title="Converter PNG para JPG"
      description="Converta imagens PNG para JPG gratuitamente, direto no navegador, sem enviar seus arquivos para nenhum servidor."
      path="/png-para-jpg"
      toFormat="jpg"
      faq={[
        {
          question: "A conversão é segura?",
          answer: "Sim. O processo acontece inteiramente no seu navegador, e a imagem nunca é enviada para nossos servidores.",
        },
        {
          question: "O que acontece com a transparência do PNG?",
          answer: "Como o JPG não suporta transparência, as áreas transparentes são preenchidas com fundo branco.",
        },
      ]}
    />
  );
}
