import ConversionTool from "../components/ConversionTool";

export default function JpgParaPng() {
  return (
    <ConversionTool
      title="Converter JPG para PNG"
      description="Converta imagens JPG para PNG gratuitamente, direto no navegador, sem enviar seus arquivos para nenhum servidor."
      path="/jpg-para-png"
      toFormat="png"
      aboutTitle="Por que converter JPG para PNG"
      about={[
        "Diferente da conversão inversa, ir de JPG para PNG não recupera qualidade que já foi perdida na compressão original do JPG — os pixels descartados não voltam. O que essa conversão evita é uma perda adicional: qualquer edição ou salvamento futuro em PNG não vai degradar a imagem de novo, já que o formato é sem perdas.",
        "É uma conversão comum antes de editar a imagem em outro programa (adicionar texto, recortar, sobrepor camadas), porque cada vez que um JPG é reaberto e salvo, ele perde um pouco mais de qualidade nesse processo chamado geração de perdas. Trabalhar a partir de um PNG elimina esse risco durante a edição.",
        "Vale lembrar que essa conversão não adiciona transparência à imagem — como o JPG nunca teve canal alfa, o PNG gerado sai com fundo sólido, do mesmo jeito que a imagem original. O arquivo final também tende a ficar bem maior que o JPG de origem, já que a compressão sem perdas exige mais espaço.",
      ]}
    />
  );
}
