export const formatComparisonText = {
  "pt-BR": {
    title: "Comparação entre formatos",
    subtitle: "Não sabe qual formato escolher? Veja as principais diferenças entre PNG, JPG e WebP.",
    caption: "Comparação de suporte a transparência, tipo de compressão e melhor uso por formato de imagem",
    colFormat: "Formato",
    colTransparency: "Transparência",
    colCompression: "Compressão",
    colBestFor: "Melhor uso",
    rows: [
      { format: "PNG", transparency: "Sim", compression: "Sem perdas", bestFor: "Logos, ilustrações e imagens com fundo transparente." },
      { format: "JPG", transparency: "Não", compression: "Com perdas", bestFor: "Fotografias e imagens complexas com menor tamanho de arquivo." },
      { format: "WebP", transparency: "Sim", compression: "Alta eficiência", bestFor: "Imagens otimizadas para sites e a web moderna." },
    ],
  },
  en: {
    title: "Format comparison",
    subtitle: "Not sure which format to choose? See the key differences between PNG, JPG, and WebP.",
    caption: "Comparison of transparency support, compression type, and best use per image format",
    colFormat: "Format",
    colTransparency: "Transparency",
    colCompression: "Compression",
    colBestFor: "Best for",
    rows: [
      { format: "PNG", transparency: "Yes", compression: "Lossless", bestFor: "Logos, illustrations, and images with a transparent background." },
      { format: "JPG", transparency: "No", compression: "Lossy", bestFor: "Photographs and complex images with a smaller file size." },
      { format: "WebP", transparency: "Yes", compression: "Highly efficient", bestFor: "Images optimized for websites and the modern web." },
    ],
  },
} as const;
