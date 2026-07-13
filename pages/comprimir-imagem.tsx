import { useState } from "react";
import Layout from "../components/Layout";
import DropZone from "../components/DropZone";
import SeoHead from "../components/SeoHead";
import FaqList from "../components/FaqList";
import AdBanner from "../components/AdBanner";
import { useImageFile } from "../hooks/useImageFile";
import { useObjectUrl } from "../hooks/useObjectUrl";
import { compressImage } from "../tools/imageEditor";
import { downloadBlob } from "../utils/downloadFile";
import { formatBytes } from "../utils/formatBytes";

const faq = [
  {
    question: "Por que o resultado é sempre em JPG?",
    answer: "A compressão com controle de qualidade é uma característica do formato JPG. Para manter transparência, use a ferramenta de conversão para WebP.",
  },
];

export default function ComprimirImagem() {
  const { file, previewUrl, isDragging, selectFile, reset, handleDrop, handleDragOver, handleDragLeave } =
    useImageFile();
  const [quality, setQuality] = useState(0.7);
  const [result, setResult] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);
  const resultUrl = useObjectUrl(result);

  const handleCompress = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      setResult(await compressImage(file, quality));
    } catch {
      alert("Não foi possível comprimir esta imagem.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result || !file) return;
    const name = file.name.replace(/\.[^.]+$/, "");
    downloadBlob(result, `${name}-comprimida.jpg`);
  };

  return (
    <Layout>
      <SeoHead
        title="Comprimir imagem"
        description="Comprima imagens gratuitamente, direto no navegador, reduzindo o tamanho do arquivo com controle de qualidade."
        path="/comprimir-imagem"
        faq={faq}
      />

      <section className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="text-3xl font-bold text-ink">Comprimir imagem</h1>
        <p className="mt-2 text-muted">Ajuste a qualidade e reduza o tamanho do arquivo. O resultado é salvo em JPG.</p>

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
                alt={resultUrl && !showOriginal ? "Imagem comprimida" : "Pré-visualização"}
                className={`max-h-80 rounded-lg border ${
                  resultUrl && !showOriginal ? "border-accent" : "border-border"
                }`}
              />

              {resultUrl && (
                <button
                  onClick={() => setShowOriginal((v) => !v)}
                  className="text-sm text-muted underline underline-offset-2"
                >
                  {showOriginal ? "Ver imagem comprimida" : "Ver imagem original"}
                </button>
              )}

              <p className="font-mono text-xs text-muted">Original: {formatBytes(file.size)}</p>

              <label className="flex w-full max-w-xs flex-col text-sm text-muted">
                Qualidade: {Math.round(quality * 100)}%
                <input
                  type="range"
                  min={0.1}
                  max={1}
                  step={0.05}
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="mt-1"
                />
              </label>

              {!result ? (
                <button
                  onClick={handleCompress}
                  disabled={isProcessing}
                  className="rounded-full bg-accent px-6 py-2 font-medium text-white hover:bg-accent-hover disabled:opacity-50"
                >
                  {isProcessing ? "Processando..." : "Comprimir imagem"}
                </button>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <p className="font-mono text-xs text-muted">Novo tamanho: {formatBytes(result.size)}</p>
                  <button
                    onClick={handleDownload}
                    className="rounded-full bg-success px-6 py-2 font-medium text-white hover:bg-success-hover"
                  >
                    Baixar imagem
                  </button>
                </div>
              )}

              <button
                onClick={() => {
                  reset();
                  setResult(null);
                  setShowOriginal(false);
                }}
                className="text-sm text-muted underline underline-offset-2"
              >
                Escolher outra imagem
              </button>
            </div>
          )}
        </div>

        <AdBanner position="tool-below-editor" className="my-10" />
        <AdBanner position="tool-above-faq" className="mb-8" />

        <FaqList items={faq} />
      </section>
    </Layout>
  );
}
