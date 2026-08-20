import { useState } from "react";
import Layout from "../components/Layout";
import DropZone from "../components/DropZone";
import SeoHead from "../components/SeoHead";
import FaqList from "../components/FaqList";
import { useImageFile } from "../hooks/useImageFile";
import { useObjectUrl } from "../hooks/useObjectUrl";
import { compressImage } from "../tools/imageEditor";
import { downloadBlob } from "../utils/downloadFile";
import { formatBytes } from "../utils/formatBytes";
import { useLocale } from "../utils/i18n";
import { comprimirImagemText } from "../locales/pages/comprimir-imagem";

interface Dimensions {
  width: number;
  height: number;
}

export default function ComprimirImagem() {
  const locale = useLocale();
  const t = comprimirImagemText[locale];

  const { file, previewUrl, isDragging, selectFile, reset, handleDrop, handleDragOver, handleDragLeave } =
    useImageFile();
  const [quality, setQuality] = useState(0.7);
  const [result, setResult] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);
  const [dimensions, setDimensions] = useState<Dimensions | null>(null);
  const resultUrl = useObjectUrl(result);

  // a compressão não altera largura/altura, então basta ler a dimensão uma vez,
  // a partir do próprio <img> de preview já renderizado
  const handlePreviewLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    if (naturalWidth && naturalHeight) setDimensions({ width: naturalWidth, height: naturalHeight });
  };

  const handleCompress = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      setResult(await compressImage(file, quality));
    } catch {
      alert(t.errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result || !file) return;
    const name = file.name.replace(/\.[^.]+$/, "");
    downloadBlob(result, `${name}-${t.downloadSuffix}.jpg`);
  };

  return (
    <Layout>
      <SeoHead title={t.seoTitle} description={t.seoDescription} path="/comprimir-imagem" faq={t.faq} />

      <section className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="text-3xl font-bold text-ink text-center">{t.title}</h1>
        <p className="mt-2 text-muted text-center">{t.subtitle}</p>

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
                alt={resultUrl && !showOriginal ? t.compressedAlt : t.previewAlt}
                onLoad={handlePreviewLoad}
                className={`max-h-80 rounded-lg border ${
                  resultUrl && !showOriginal ? "border-accent" : "border-border"
                }`}
              />

              {resultUrl && (
                <button
                  onClick={() => setShowOriginal((v) => !v)}
                  className="text-sm text-muted underline underline-offset-2"
                >
                  {showOriginal ? t.viewCompressed : t.viewOriginal}
                </button>
              )}

              <p className="font-mono text-xs text-muted">
                {t.original}: {formatBytes(file.size)}
                {dimensions && ` · ${dimensions.width}×${dimensions.height}`}
              </p>

              <label className="flex w-full max-w-xs flex-col text-sm text-muted">
                {t.quality}: {Math.round(quality * 100)}%
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
                  {isProcessing ? t.processing : t.compressButton}
                </button>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <p className="font-mono text-xs text-muted">
                    {t.newSize}: {formatBytes(result.size)}
                  </p>
                  <button
                    onClick={handleDownload}
                    className="rounded-full bg-success px-6 py-2 font-medium text-white hover:bg-success-hover"
                  >
                    {t.downloadButton}
                  </button>
                </div>
              )}

              <button
                onClick={() => {
                  reset();
                  setResult(null);
                  setShowOriginal(false);
                  setDimensions(null);
                }}
                className="text-sm text-muted underline underline-offset-2"
              >
                {t.chooseAnother}
              </button>
            </div>
          )}
        </div>

        <FaqList items={t.faq as unknown as { question: string; answer: string }[]} />
      </section>
    </Layout>
  );
}
