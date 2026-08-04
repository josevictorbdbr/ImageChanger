import ConversionTool from "../components/ConversionTool";

export default function JpgParaWebp() {
  return (
    <ConversionTool
      title="Converter JPG para WebP"
      description="Converta imagens JPG para WebP gratuitamente, direto no navegador, sem enviar seus arquivos para nenhum servidor."
      path="/jpg-para-webp"
      toFormat="webp"
      aboutTitle="JPG para WebP: menos peso, mesma qualidade"
      about={[
        "Tanto o JPG quanto o WebP usam compressão com perdas para fotografias, mas o algoritmo do WebP é mais moderno e eficiente. Na prática, isso costuma resultar em arquivos 25% a 34% menores que o JPG equivalente, com um nível de qualidade visual muito próximo — a diferença raramente é perceptível a olho nu em uso cotidiano.",
        "Essa conversão é especialmente útil para quem publica fotos em sites ou lojas online, onde o tamanho total da página afeta diretamente a velocidade de carregamento. Trocar JPGs por WebP em uma galeria de produtos, por exemplo, pode reduzir bastante o peso total sem sacrificar a apresentação visual.",
        "Como o JPG nunca teve suporte a transparência, essa conversão não muda esse aspecto — o WebP gerado também não terá canal alfa a partir de uma imagem JPG, simplesmente porque não havia transparência para preservar na origem.",
      ]}
    />
  );
}
