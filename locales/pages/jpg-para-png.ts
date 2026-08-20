export const jpgParaPngText = {
  "pt-BR": {
    title: "Converter JPG para PNG",
    seoDescription: "Converta imagens JPG para PNG gratuitamente, direto no navegador, sem enviar seus arquivos para nenhum servidor.",
    aboutTitle: "Por que converter JPG para PNG",
    about: [
      "Diferente da conversão inversa, ir de JPG para PNG não recupera qualidade que já foi perdida na compressão original do JPG — os pixels descartados não voltam. O que essa conversão evita é uma perda adicional: qualquer edição ou salvamento futuro em PNG não vai degradar a imagem de novo, já que o formato é sem perdas.",
      "É uma conversão comum antes de editar a imagem em outro programa (adicionar texto, recortar, sobrepor camadas), porque cada vez que um JPG é reaberto e salvo, ele perde um pouco mais de qualidade nesse processo chamado geração de perdas. Trabalhar a partir de um PNG elimina esse risco durante a edição.",
      "Vale lembrar que essa conversão não adiciona transparência à imagem — como o JPG nunca teve canal alfa, o PNG gerado sai com fundo sólido, do mesmo jeito que a imagem original. O arquivo final também tende a ficar bem maior que o JPG de origem, já que a compressão sem perdas exige mais espaço.",
    ],
  },
  en: {
    title: "Convert JPG to PNG",
    seoDescription: "Convert JPG images to PNG for free, directly in your browser, without uploading your files to any server.",
    aboutTitle: "Why convert JPG to PNG",
    about: [
      "Unlike the reverse conversion, going from JPG to PNG doesn't recover quality already lost in the original JPG compression — the discarded pixels don't come back. What this conversion does prevent is additional loss: any future editing or saving in PNG won't degrade the image again, since the format is lossless.",
      "This is a common conversion before editing an image in another program (adding text, cropping, layering), because every time a JPG is reopened and saved, it loses a bit more quality in a process called generation loss. Working from a PNG eliminates that risk during editing.",
      "Keep in mind this conversion doesn't add transparency to the image — since JPG never had an alpha channel, the resulting PNG comes out with a solid background, just like the original image. The final file also tends to be much larger than the source JPG, since lossless compression requires more space.",
    ],
  },
} as const;
