export type ImageFormat = "png" | "jpg" | "webp";

export interface ConversionRoute {
  from: ImageFormat;
  to: ImageFormat;
  path: string;
}

export const CONVERSIONS: ConversionRoute[] = [
  { from: "png", to: "jpg", path: "/png-para-jpg" },
  { from: "jpg", to: "png", path: "/jpg-para-png" },
  { from: "png", to: "webp", path: "/png-para-webp" },
  { from: "webp", to: "png", path: "/webp-para-png" },
  { from: "jpg", to: "webp", path: "/jpg-para-webp" },
  { from: "webp", to: "jpg", path: "/webp-para-jpg" },
];

export function findConversionPath(from: ImageFormat, to: ImageFormat): string | null {
  return CONVERSIONS.find((c) => c.from === from && c.to === to)?.path ?? null;
}

export function getAvailableFormats(): ImageFormat[] {
  return Array.from(new Set(CONVERSIONS.flatMap((c) => [c.from, c.to])));
}

export function getAvailableTargets(from: ImageFormat): ImageFormat[] {
  return CONVERSIONS.filter((c) => c.from === from).map((c) => c.to);
}