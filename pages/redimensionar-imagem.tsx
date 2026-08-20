import { useState } from "react";
import Layout from "../components/Layout";
import DropZone from "../components/DropZone";
import SeoHead from "../components/SeoHead";
import FaqList from "../components/FaqList";
import { useImageFile } from "../hooks/useImageFile";
import { useObjectUrl } from "../hooks/useObjectUrl";
import { resizeImage } from "../tools/imageEditor";
import { downloadBlob } from "../utils/downloadFile";
import { useLocale } from "../utils/i18n";
import { redimensionarImagemText } from "../locales/pages/redimensionar-imagem";

interface Dimensions {
  width: number;
  height: number;
}

export default function RedimensionarImagem() {
  const locale = useLocale();
  const t = redimensionarImagemText[locale];

  const { file, previewUrl, isDragging, selectFile, reset, handleDrop, handleDragOver, handleDragLeave } =
    useImageFile();
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [result, setResult] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);
  const [dimensions, setDimensions] = useState<Dimensions | null>(null);
  const resultUrl = useObjectUrl(result);

  // lê a dimensão real a partir do próprio <img> de preview já renderizado na tela
  const handlePreviewLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    if (naturalWidth && naturalHeight) setDimensions({ width: naturalWidth, height: naturalHeight });
  };

  const handleResize = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      setResult(await resizeImage(file, width, height));
    } catch {
      alert(t.errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result || !file) return;
    const [name, ext] = [file.name.replace(/\.[^.]+$/, ""), file.name.split(".").pop()];
    downloadBlob(result, `${name}-${t.downloadSuffix}.${ext}`);
  };

  return (
    <Layout>
      <SeoHead title={t.seoTitle} description={t.seoDescription} path="/redimensionar-imagem" faq={t.faq} />

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
                alt={resultUrl && !showOriginal ? t.resizedAlt : t.previewAlt}
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
                  {showOriginal ? t.viewResized : t.viewOriginal}
                </button>
              )}

              {dimensions && (
                <p className="font-mono text-xs text-muted">
                  {showOriginal || !resultUrl ? t.original : t.resizedLabel}: {dimensions.width}×{dimensions.height}
                </p>
              )}

              <div className="flex items-center gap-3">
                <label className="flex flex-col text-sm text-muted">
                  {t.widthLabel}
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="mt-1 w-28 rounded-lg border border-border px-3 py-1.5"
                  />
                </label>
                <label className="flex flex-col text-sm text-muted">
                  {t.heightLabel}
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="mt-1 w-28 rounded-lg border border-border px-3 py-1.5"
                  />
                </label>
              </div>

              {!result ? (
                <button
                  onClick={handleResize}
                  disabled={isProcessing}
                  className="rounded-full bg-accent px-6 py-2 font-medium text-white hover:bg-accent-hover disabled:opacity-50"
                >
                  {isProcessing ? t.processing : t.resizeButton}
                </button>
              ) : (
                <button
                  onClick={handleDownload}
                  className="rounded-full bg-success px-6 py-2 font-medium text-white hover:bg-success-hover"
                >
                  {t.downloadButton}
                </button>
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
