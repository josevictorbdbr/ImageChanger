import { useState } from "react";
import Layout from "./Layout";
import DropZone from "./DropZone";
import SeoHead from "./SeoHead";
import FaqList, { FaqItem } from "./FaqList";
import { useImageFile } from "../hooks/useImageFile";
import { useObjectUrl } from "../hooks/useObjectUrl";
import { convertImage, ImageFormat } from "../tools/imageConverter";
import { downloadBlob } from "../utils/downloadFile";
import { formatBytes, replaceExtension } from "../utils/formatBytes";

interface ConversionToolProps {
  title: string;
  description: string;
  path: string;
  toFormat: ImageFormat;
  faq: FaqItem[];
}

export default function ConversionTool({ title, description, path, toFormat, faq }: ConversionToolProps) {
  const { file, previewUrl, isDragging, selectFile, reset, handleDrop, handleDragOver, handleDragLeave } =
    useImageFile();
  const [result, setResult] = useState<Blob | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);
  const resultUrl = useObjectUrl(result);

  const handleConvert = async () => {
    if (!file) return;
    setIsConverting(true);
    try {
      setResult(await convertImage(file, toFormat));
    } catch {
      alert("Não foi possível converter esta imagem. Tente outro arquivo.");
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (!result || !file) return;
    downloadBlob(result, replaceExtension(file.name, toFormat));
  };

  const handleReset = () => {
    reset();
    setResult(null);
    setShowOriginal(false);
  };

  return (
    <Layout>
      <SeoHead title={title} description={description} path={path} faq={faq} />

      <section className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="text-3xl font-bold text-ink">{title}</h1>
        <p className="mt-2 text-muted">{description}</p>

        <div className="mt-8">
          {!file && (
            <DropZone
              isDragging={isDragging}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onSelect={selectFile}
            />
          )}

          {file && previewUrl && (
            <div className="flex flex-col items-center gap-4">
              <img
                src={resultUrl && !showOriginal ? resultUrl : previewUrl}
                alt={resultUrl && !showOriginal ? "Imagem convertida" : "Pré-visualização"}
                className={`max-h-80 rounded-lg border ${
                  resultUrl && !showOriginal ? "border-accent" : "border-border"
                }`}
              />

              {resultUrl && (
                <button
                  onClick={() => setShowOriginal((v) => !v)}
                  className="text-sm text-muted underline underline-offset-2"
                >
                  {showOriginal ? "Ver imagem convertida" : "Ver imagem original"}
                </button>
              )}

              <p className="font-mono text-xs text-muted">
                {file.name} · {formatBytes(file.size)}
              </p>

              {!result ? (
                <button
                  onClick={handleConvert}
                  disabled={isConverting}
                  className="rounded-full bg-accent px-6 py-2 font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
                >
                  {isConverting ? "Convertendo..." : `Converter para ${toFormat.toUpperCase()}`}
                </button>
              ) : (
                <button
                  onClick={handleDownload}
                  className="rounded-full bg-success px-6 py-2 font-medium text-white transition-colors hover:bg-success-hover"
                >
                  Baixar imagem {toFormat.toUpperCase()}
                </button>
              )}

              <button onClick={handleReset} className="text-sm text-muted underline underline-offset-2">
                Escolher outra imagem
              </button>
            </div>
          )}
        </div>

        <FaqList items={faq} />
      </section>
    </Layout>
  );
}
