export type ImageFormat = "png" | "jpg" | "webp";

const MIME_TYPES: Record<ImageFormat, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  webp: "image/webp",
};

export function convertImage(
  file: File,
  format: ImageFormat,
  quality = 0.92
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas não suportado neste navegador"));
        return;
      }

      // JPG não suporta transparência, ent preenche com fundo branco
      if (format === "jpg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("Falha ao converter a imagem"))),
        MIME_TYPES[format],
        quality
      );
    };

    img.onerror = () => reject(new Error("Não foi possível carregar a imagem"));
    img.src = url;
  });
}
