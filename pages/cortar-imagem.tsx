import { useState } from "react";
import Layout from "../components/Layout";
import DropZone from "../components/DropZone";
import CropSelector from "../components/CropSelector";
import SeoHead from "../components/SeoHead";
import FaqList from "../components/FaqList";
import { useImageFile } from "../hooks/useImageFile";
import { useObjectUrl } from "../hooks/useObjectUrl";
import { cropImage, CropArea } from "../tools/imageEditor";
import { downloadBlob } from "../utils/downloadFile";

const faq = [
  {
    question: "Como escolho a área do corte?",
    answer: "Arraste o quadro sobre a imagem para posicioná-lo e puxe os círculos nos cantos para ajustar o tamanho.",
  },
  {
    question: "Funciona no celular?",
    answer: "Sim, o quadro de corte pode ser ajustado tanto com o mouse quanto com o dedo, na tela sensível ao toque.",
  },
];

export default function CortarImagem() {
  const { file, previewUrl, isDragging, selectFile, reset, handleDrop, handleDragOver, handleDragLeave } =
    useImageFile();
  const [area, setArea] = useState<CropArea>({ x: 0, y: 0, width: 0, height: 0 });
  const [result, setResult] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);
  const resultUrl = useObjectUrl(result);

  const handleCrop = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      setResult(await cropImage(file, area));
    } catch {
      alert("Não foi possível cortar esta imagem.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result || !file) return;
    const [name, ext] = [file.name.replace(/\.[^.]+$/, ""), file.name.split(".").pop()];
    downloadBlob(result, `${name}-cortada.${ext}`);
  };

  return (
    <Layout>
      <SeoHead
        title="Cortar imagem"
        description="Corte imagens gratuitamente, direto no navegador, arrastando a área que você quer manter."
        path="/cortar-imagem"
        faq={faq}
      />

      <section className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="text-3xl font-bold text-ink">Cortar imagem</h1>
        <p className="mt-2 text-muted">Arraste o quadro para posicionar e os cantos para redimensionar o corte.</p>

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
              {resultUrl ? (
                <>
                  <img
                    src={showOriginal ? previewUrl : resultUrl}
                    alt={showOriginal ? "Pré-visualização" : "Imagem cortada"}
                    className={`max-h-80 rounded-lg border ${showOriginal ? "border-border" : "border-accent"}`}
                  />
                  <button
                    onClick={() => setShowOriginal((v) => !v)}
                    className="text-sm text-muted underline underline-offset-2"
                  >
                    {showOriginal ? "Ver imagem cortada" : "Ver imagem original"}
                  </button>
                </>
              ) : (
                <>
                  <CropSelector imageUrl={previewUrl} onChange={setArea} />
                  <p className="font-mono text-xs text-muted">
                    {area.width} × {area.height}px
                  </p>
                </>
              )}

              {!result ? (
                <button
                  onClick={handleCrop}
                  disabled={isProcessing || !area.width}
                  className="rounded-full bg-accent px-6 py-2 font-medium text-white hover:bg-accent-hover disabled:opacity-50"
                >
                  {isProcessing ? "Processando..." : "Cortar imagem"}
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
