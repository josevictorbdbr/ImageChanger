import { useState } from "react";
import Layout from "../components/Layout";
import DropZone from "../components/DropZone";
import SeoHead from "../components/SeoHead";
import FaqList from "../components/FaqList";
import { useImageFile } from "../hooks/useImageFile";
import { useObjectUrl } from "../hooks/useObjectUrl";
import { rotateImage } from "../tools/imageEditor";
import { downloadBlob } from "../utils/downloadFile";

const ANGLES: (90 | 180 | 270)[] = [90, 180, 270];

const faq = [
  {
    question: "A qualidade da imagem muda ao girar?",
    answer: "Não. A rotação apenas reorganiza os pixels, sem recompressão perceptível.",
  },
];

export default function GirarImagem() {
  const { file, previewUrl, isDragging, selectFile, reset, handleDrop, handleDragOver, handleDragLeave } =
    useImageFile();
  const [angle, setAngle] = useState<90 | 180 | 270>(90);
  const [result, setResult] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);
  const resultUrl = useObjectUrl(result);

  const handleRotate = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      setResult(await rotateImage(file, angle));
    } catch {
      alert("Não foi possível girar esta imagem.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result || !file) return;
    const [name, ext] = [file.name.replace(/\.[^.]+$/, ""), file.name.split(".").pop()];
    downloadBlob(result, `${name}-girada.${ext}`);
  };

  return (
    <Layout>
      <SeoHead
        title="Girar imagem"
        description="Gire imagens em 90°, 180° ou 270° gratuitamente, direto no navegador."
        path="/girar-imagem"
        faq={faq}
      />

      <section className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="text-3xl font-bold text-ink">Girar imagem</h1>
        <p className="mt-2 text-muted">Escolha o ângulo de rotação e baixe a imagem girada.</p>

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
                alt={resultUrl && !showOriginal ? "Imagem girada" : "Pré-visualização"}
                className={`max-h-80 rounded-lg border ${
                  resultUrl && !showOriginal ? "border-accent" : "border-border"
                }`}
              />

              {resultUrl && (
                <button
                  onClick={() => setShowOriginal((v) => !v)}
                  className="text-sm text-muted underline underline-offset-2"
                >
                  {showOriginal ? "Ver imagem girada" : "Ver imagem original"}
                </button>
              )}

              <div className="flex gap-2">
                {ANGLES.map((a) => (
                  <button
                    key={a}
                    onClick={() => setAngle(a)}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                      angle === a ? "bg-accent text-white" : "border border-border text-muted"
                    }`}
                  >
                    {a}°
                  </button>
                ))}
              </div>

              {!result ? (
                <button
                  onClick={handleRotate}
                  disabled={isProcessing}
                  className="rounded-full bg-accent px-6 py-2 font-medium text-white hover:bg-accent-hover disabled:opacity-50"
                >
                  {isProcessing ? "Processando..." : "Girar imagem"}
                </button>
              ) : (
                <button
                  onClick={handleDownload}
                  className="rounded-full bg-success px-6 py-2 font-medium text-white hover:bg-success-hover"
                >
                  Baixar imagem
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
