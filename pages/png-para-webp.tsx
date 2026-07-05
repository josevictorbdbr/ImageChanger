import ConversionTool from "../components/ConversionTool";

export default function PngParaWebp() {
  return (
    <ConversionTool
      title="Converter PNG para WebP"
      description="Converta imagens PNG para WebP gratuitamente, direto no navegador, sem enviar seus arquivos para nenhum servidor."
      path="/png-para-webp"
      toFormat="webp"
      faq={[
        {
          question: "O que é WebP?",
          answer: "É um formato de imagem moderno, criado pelo Google, que costuma gerar arquivos bem menores mantendo a qualidade.",
        },
        {
          question: "A transparência é mantida?",
          answer: "Sim, o WebP suporta transparência assim como o PNG.",
        },
      ]}
    />
  );
}
