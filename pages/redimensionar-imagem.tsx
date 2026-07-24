import { useState } from "react";
import Layout from "../components/Layout";
import DropZone from "../components/DropZone";
import SeoHead from "../components/SeoHead";
import FaqList from "../components/FaqList";
import AdBanner from "../components/AdBanner";
import { useImageFile } from "../hooks/useImageFile";
import { useObjectUrl } from "../hooks/useObjectUrl";
import { resizeImage } from "../tools/imageEditor";
import { downloadBlob } from "../utils/downloadFile";

const faq = [
  {
    question: "A imagem fica distorcida?",
    answer: "Se a proporção informada for diferente da original, a imagem pode ficar esticada. Mantenha a proporção para evitar isso.",
  },
  {
    question: "Posso aumentar o tamanho da imagem?",
    answer: "Sim, mas aumentar muito uma imagem pequena pode deixá-la borrada, já que não há pixels novos sendo criados.",
  },
];

export default function RedimensionarImagem() {
  const { file, previewUrl, isDragging, selectFile, reset, handleDrop, handleDragOver, handleDragLeave } =
    useImageFile();
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [result, setResult] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);
  const resultUrl = useObjectUrl(result);

  const handleResize = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      setResult(await resizeImage(file, width, height));
    } catch {
      alert("Não foi possível redimensionar esta imagem.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result || !file) return;
    const [name, ext] = [file.name.replace(/\.[^.]+$/, ""), file.name.split(".").pop()];
    downloadBlob(result, `${name}-redimensionada.${ext}`);
  };

  return (
    <Layout>
      <SeoHead
        title="Redimensionar imagem"
        description="Redimensione imagens gratuitamente, direto no navegador, definindo a largura e a altura desejadas."
        path="/redimensionar-imagem"
        faq={faq}
      />

      <section className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="text-3xl font-bold text-ink">Redimensionar imagem</h1>
        <p className="mt-2 text-muted">
          Escolha a nova largura e altura da sua imagem, sem perder qualidade desnecessariamente.
        </p>

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
                alt={resultUrl && !showOriginal ? "Imagem redimensionada" : "Pré-visualização"}
                className={`max-h-80 rounded-lg border ${
                  resultUrl && !showOriginal ? "border-accent" : "border-border"
                }`}
              />

              {resultUrl && (
                <button
                  onClick={() => setShowOriginal((v) => !v)}
                  className="text-sm text-muted underline underline-offset-2"
                >
                  {showOriginal ? "Ver imagem redimensionada" : "Ver imagem original"}
                </button>
              )}

              <div className="flex items-center gap-3">
                <label className="flex flex-col text-sm text-muted">
                  Largura (px)
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="mt-1 w-28 rounded-lg border border-border px-3 py-1.5"
                  />
                </label>
                <label className="flex flex-col text-sm text-muted">
                  Altura (px)
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
                  {isProcessing ? "Processando..." : "Redimensionar"}
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
