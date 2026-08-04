import ConversionTool from "../components/ConversionTool";

export default function PngParaJpg() {
  return (
    <ConversionTool
      title="Converter PNG para JPG"
      description="Converta imagens PNG para JPG gratuitamente, direto no navegador, sem enviar seus arquivos para nenhum servidor."
      path="/png-para-jpg"
      toFormat="jpg"
      aboutTitle="PNG para JPG: o que muda na prática"
      about={[
        "O PNG usa compressão sem perdas, o que garante qualidade máxima mas gera arquivos maiores. O JPG comprime com perdas: descarta parte da informação visual que o olho humano dificilmente percebe, e em troca reduz bastante o tamanho do arquivo — geralmente entre 50% e 80% menor, dependendo da complexidade da imagem.",
        "A diferença mais importante é a transparência. O JPG não tem canal alfa, então qualquer área transparente do PNG original precisa ser preenchida com uma cor sólida antes da conversão. O Image Changer preenche essas áreas com fundo branco automaticamente — se a sua imagem tiver elementos transparentes importantes (como um logo), vale considerar manter o PNG ou converter para WebP em vez de JPG.",
        "Essa conversão faz mais sentido para fotografias e imagens com muitas cores e gradientes, onde a perda de qualidade do JPG é praticamente imperceptível e o ganho de espaço é grande. Para ilustrações com poucas cores, textos ou logos, o PNG tende a comprimir melhor e manter bordas mais nítidas.",
      ]}
    />
  );
}
