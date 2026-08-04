import ConversionTool from "../components/ConversionTool";

export default function WebpParaPng() {
  return (
    <ConversionTool
      title="Converter WebP para PNG"
      description="Converta imagens WebP para PNG gratuitamente, direto no navegador, sem enviar seus arquivos para nenhum servidor."
      path="/webp-para-png"
      toFormat="png"
      aboutTitle="Quando faz sentido voltar para PNG"
      about={[
        "O WebP é relativamente recente comparado ao PNG, que existe desde os anos 90 e é reconhecido por praticamente qualquer programa, sistema ou dispositivo já criado. Por isso, converter WebP para PNG costuma ser uma questão de compatibilidade, não de qualidade: alguns editores de imagem mais antigos, plugins de CMS desatualizados ou fluxos de impressão profissional ainda não lidam bem com arquivos WebP.",
        "Como o WebP pode ser tanto sem perdas quanto com perdas, a qualidade final do PNG gerado depende de como o WebP original foi criado. Se o arquivo WebP já veio de uma compressão com perdas, essa conversão não recupera detalhes que já foram descartados anteriormente — ela só reempacota a imagem existente em um formato mais universal.",
        "O tamanho do arquivo tende a aumentar nessa conversão, já que o PNG não tem a mesma eficiência de compressão do WebP. Isso é esperado: o objetivo aqui é compatibilidade e facilidade de uso em qualquer software, não economia de espaço.",
      ]}
    />
  );
}
