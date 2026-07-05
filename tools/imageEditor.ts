function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => reject(new Error("Não foi possível carregar a imagem"));
    img.src = url;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Falha ao gerar a imagem"))),
      type,
      quality
    );
  });
}

export async function resizeImage(file: File, width: number, height: number): Promise<Blob> {
  const img = await loadImage(file);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0, width, height);

  return canvasToBlob(canvas, file.type || "image/png");
}

export async function rotateImage(file: File, degrees: 90 | 180 | 270): Promise<Blob> {
  const img = await loadImage(file);
  const rad = (degrees * Math.PI) / 180;
  const swap = degrees === 90 || degrees === 270;

  const canvas = document.createElement("canvas");
  canvas.width = swap ? img.height : img.width;
  canvas.height = swap ? img.width : img.height;

  const ctx = canvas.getContext("2d")!;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(rad);
  ctx.drawImage(img, -img.width / 2, -img.height / 2);

  return canvasToBlob(canvas, file.type || "image/png");
}

export async function flipImage(file: File, direction: "horizontal" | "vertical"): Promise<Blob> {
  const img = await loadImage(file);
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  const ctx = canvas.getContext("2d")!;
  if (direction === "horizontal") {
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
  } else {
    ctx.translate(0, canvas.height);
    ctx.scale(1, -1);
  }
  ctx.drawImage(img, 0, 0);

  return canvasToBlob(canvas, file.type || "image/png");
}

export async function compressImage(file: File, quality: number): Promise<Blob> {
  const img = await loadImage(file);
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0);

  return canvasToBlob(canvas, "image/jpeg", quality);
}

export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

// MVP: coordenadas numéricas informadas pelo usuário.
// Evolução futura: seleção visual da área (ex: biblioteca react-easy-crop).
export async function cropImage(file: File, area: CropArea): Promise<Blob> {
  const img = await loadImage(file);
  const canvas = document.createElement("canvas");
  canvas.width = area.width;
  canvas.height = area.height;

  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, area.x, area.y, area.width, area.height, 0, 0, area.width, area.height);

  return canvasToBlob(canvas, file.type || "image/png");
}
