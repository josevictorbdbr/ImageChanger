import ConversionTool from "../components/ConversionTool";

export default function WebpParaJpg() {
  return (
    <ConversionTool
      title="Converter WebP para JPG"
      description="Converta imagens WebP para JPG gratuitamente, direto no navegador, sem enviar seus arquivos para nenhum servidor."
      path="/webp-para-jpg"
      toFormat="jpg"
      aboutTitle="WebP para JPG: compatibilidade em primeiro lugar"
      about={[
        "Mesmo com o WebP cada vez mais comum na web, o JPG ainda é o formato mais universalmente aceito fora do navegador: aplicativos de mensagem, serviços de impressão, alguns sistemas corporativos antigos e certos programas de edição preferem ou exigem JPG. Converter WebP para JPG resolve esse tipo de incompatibilidade rapidamente.",
        "Como o WebP não tem canal de transparência quando é do tipo com perdas (o caso mais comum em fotos), a conversão para JPG normalmente não altera a aparência da imagem — o resultado visual costuma ficar muito próximo do original. Uma pequena perda de qualidade pode ocorrer pela recompressão, mas geralmente é imperceptível em uso normal.",
        "Se a imagem WebP original tiver transparência (o formato sem perdas suporta canal alfa), essa conversão descarta essa transparência, preenchendo o fundo com uma cor sólida — o mesmo comportamento que ocorre ao converter qualquer imagem para JPG, já que esse formato nunca suportou transparência.",
      ]}
    />
  );
}
