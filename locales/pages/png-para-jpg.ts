export const pngParaJpgText = {
  "pt-BR": {
    title: "Converter PNG para JPG",
    seoDescription: "Converta imagens PNG para JPG gratuitamente, direto no navegador, sem enviar seus arquivos para nenhum servidor.",
    aboutTitle: "PNG para JPG: o que muda na prática",
    about: [
      "O PNG usa compressão sem perdas, o que garante qualidade máxima mas gera arquivos maiores. O JPG comprime com perdas: descarta parte da informação visual que o olho humano dificilmente percebe, e em troca reduz bastante o tamanho do arquivo — geralmente entre 50% e 80% menor, dependendo da complexidade da imagem.",
      "A diferença mais importante é a transparência. O JPG não tem canal alfa, então qualquer área transparente do PNG original precisa ser preenchida com uma cor sólida antes da conversão. O Image Changer preenche essas áreas com fundo branco automaticamente — se a sua imagem tiver elementos transparentes importantes (como um logo), vale considerar manter o PNG ou converter para WebP em vez de JPG.",
      "Essa conversão faz mais sentido para fotografias e imagens com muitas cores e gradientes, onde a perda de qualidade do JPG é praticamente imperceptível e o ganho de espaço é grande. Para ilustrações com poucas cores, textos ou logos, o PNG tende a comprimir melhor e manter bordas mais nítidas.",
    ],
  },
  en: {
    title: "Convert PNG to JPG",
    seoDescription: "Convert PNG images to JPG for free, directly in your browser, without uploading your files to any server.",
    aboutTitle: "PNG to JPG: what changes in practice",
    about: [
      "PNG uses lossless compression, which guarantees maximum quality but produces larger files. JPG compresses with loss: it discards part of the visual information the human eye can barely perceive, and in exchange significantly reduces file size — typically 50% to 80% smaller, depending on the image's complexity.",
      "The most important difference is transparency. JPG has no alpha channel, so any transparent area in the original PNG needs to be filled with a solid color before conversion. Image Changer automatically fills these areas with a white background — if your image has important transparent elements (like a logo), consider keeping the PNG or converting to WebP instead of JPG.",
      "This conversion makes the most sense for photographs and images with many colors and gradients, where JPG's quality loss is practically imperceptible and the space savings are significant. For illustrations with few colors, text, or logos, PNG tends to compress better and keep edges sharper.",
    ],
  },
} as const;
