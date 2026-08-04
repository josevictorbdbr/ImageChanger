import ConversionTool from "../components/ConversionTool";

export default function PngParaWebp() {
  return (
    <ConversionTool
      title="Converter PNG para WebP"
      description="Converta imagens PNG para WebP gratuitamente, direto no navegador, sem enviar seus arquivos para nenhum servidor."
      path="/png-para-webp"
      toFormat="webp"
      aboutTitle="PNG para WebP: ganhos reais de desempenho"
      about={[
        "O WebP foi desenvolvido pelo Google especificamente para a web, usando um algoritmo de compressão mais eficiente que o PNG. Na prática, isso significa arquivos frequentemente 25% a 35% menores que o PNG equivalente, com suporte a transparência mantido — ou seja, você não perde o que o PNG já oferecia, só ganha em peso de arquivo.",
        "Esse ganho é especialmente relevante para quem publica imagens em sites: páginas mais leves carregam mais rápido, o que impacta diretamente métricas como Core Web Vitals e a experiência em conexões mais lentas ou dados móveis. Logos, ícones e ilustrações com fundo transparente são bons candidatos a essa conversão.",
        "O suporte a WebP nos navegadores é amplo hoje em dia (Chrome, Firefox, Safari e Edge exibem o formato normalmente), mas se o destino final da imagem for um programa de edição mais antigo ou um sistema que não reconheça WebP, vale confirmar a compatibilidade antes de substituir os arquivos PNG originais por completo.",
      ]}
    />
  );
}
