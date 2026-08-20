import { useState } from "react";
import Layout from "../components/Layout";
import DropZone from "../components/DropZone";
import SeoHead from "../components/SeoHead";
import FaqList from "../components/FaqList";
import { useImageFile } from "../hooks/useImageFile";
import { useObjectUrl } from "../hooks/useObjectUrl";
import { flipImage } from "../tools/imageEditor";
import { downloadBlob } from "../utils/downloadFile";
import { useLocale } from "../utils/i18n";
import { espelharImagemText } from "../locales/pages/espelhar-imagem";

export default function EspelharImagem() {
  const locale = useLocale();
  const t = espelharImagemText[locale];

  const { file, previewUrl, isDragging, selectFile, reset, handleDrop, handleDragOver, handleDragLeave } =
    useImageFile();
  const [direction, setDirection] = useState<"horizontal" | "vertical">("horizontal");
  const [result, setResult] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);
  const resultUrl = useObjectUrl(result);

  const handleFlip = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      setResult(await flipImage(file, direction));
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
      <SeoHead title={t.seoTitle} description={t.seoDescription} path="/espelhar-imagem" faq={t.faq} />

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
                alt={resultUrl && !showOriginal ? t.flippedAlt : t.previewAlt}
                className={`max-h-80 rounded-lg border ${
                  resultUrl && !showOriginal ? "border-accent" : "border-border"
                }`}
              />

              {resultUrl && (
                <button
                  onClick={() => setShowOriginal((v) => !v)}
                  className="text-sm text-muted underline underline-offset-2"
                >
                  {showOriginal ? t.viewFlipped : t.viewOriginal}
                </button>
              )}

              <div className="flex gap-2">
                {(["horizontal", "vertical"] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDirection(d)}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize ${
                      direction === d ? "bg-accent text-white" : "border border-border text-muted"
                    }`}
                  >
                    {d === "horizontal" ? t.horizontal : t.vertical}
                  </button>
                ))}
              </div>

              {!result ? (
                <button
                  onClick={handleFlip}
                  disabled={isProcessing}
                  className="rounded-full bg-accent px-6 py-2 font-medium text-white hover:bg-accent-hover disabled:opacity-50"
                >
                  {isProcessing ? t.processing : t.flipButton}
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
