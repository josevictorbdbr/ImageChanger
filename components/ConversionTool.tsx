import { useState } from "react";
import JSZip from "jszip";
import Layout from "./Layout";
import DropZone from "./DropZone";
import SeoHead from "./SeoHead";
import FaqList, { FaqItem } from "./FaqList";
import AdBanner from "./AdBanner";
import HowItWorks from "./HowItWorks";
import WhyUseUs from "./WhyUseUs";
import FormatComparisonTable from "./FormatComparisonTable";
import FaqAccordion from "./FaqAccordion";
import { SITE_FAQ } from "../utils/siteFaq";
import { useMultiImageFiles, ManagedFile } from "../hooks/useMultiImageFiles";
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

type Status = "pending" | "converting" | "done" | "error";

interface FileResult {
  status: Status;
  result?: Blob;
  resultUrl?: string;
  error?: string;
  showOriginal: boolean;
}

// Evita que dois arquivos com o mesmo nome final se sobrescrevam dentro do .zip
function uniqueZipName(name: string, usedNames: Set<string>): string {
  if (!usedNames.has(name)) {
    usedNames.add(name);
    return name;
  }
  const match = name.match(/^(.*?)(\.[^.]+)?$/);
  const base = match?.[1] ?? name;
  const ext = match?.[2] ?? "";
  let n = 2;
  let candidate = `${base}-${n}${ext}`;
  while (usedNames.has(candidate)) {
    n++;
    candidate = `${base}-${n}${ext}`;
  }
  usedNames.add(candidate);
  return candidate;
}

export default function ConversionTool({ title, description, path, toFormat, faq }: ConversionToolProps) {
  const { files, isDragging, addFiles, removeFile, reset, handleDrop, handleDragOver, handleDragLeave, maxFiles } =
    useMultiImageFiles();
  const [results, setResults] = useState<Record<string, FileResult>>({});
  const [isConverting, setIsConverting] = useState(false);
  const [processingIndex, setProcessingIndex] = useState<number | null>(null);
  const [isZipping, setIsZipping] = useState(false);
  const [zipError, setZipError] = useState<string | null>(null);

  // percorre a lista de arquivos e chama a função de conversão já existente para cada um,
  // sem alterar convertImage — cada imagem segue independente mesmo se alguma falhar
  const convertAll = async () => {
    setIsConverting(true);
    setZipError(null);
    const initial: Record<string, FileResult> = {};
    files.forEach((f) => (initial[f.id] = { status: "pending", showOriginal: false }));
    setResults(initial);

    for (let i = 0; i < files.length; i++) {
      const item = files[i];
      setProcessingIndex(i);
      setResults((prev) => ({ ...prev, [item.id]: { status: "converting", showOriginal: false } }));
      try {
        const blob = await convertImage(item.file, toFormat);
        const resultUrl = URL.createObjectURL(blob);
        setResults((prev) => ({
          ...prev,
          [item.id]: { status: "done", result: blob, resultUrl, showOriginal: false },
        }));
      } catch {
        setResults((prev) => ({
          ...prev,
          [item.id]: { status: "error", error: "Não foi possível converter esta imagem.", showOriginal: false },
        }));
      }
    }

    setProcessingIndex(null);
    setIsConverting(false);
  };

  const toggleOriginal = (id: string) => {
    setResults((prev) => ({ ...prev, [id]: { ...prev[id], showOriginal: !prev[id]?.showOriginal } }));
  };

  const handleDownload = (item: ManagedFile) => {
    const r = results[item.id];
    if (!r?.result) return;
    downloadBlob(r.result, replaceExtension(item.file.name, toFormat));
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    setZipError(null);
    try {
      const zip = new JSZip();
      const usedNames = new Set<string>();

      files.forEach((item) => {
        const r = results[item.id];
        if (!r?.result) return;
        const name = uniqueZipName(replaceExtension(item.file.name, toFormat), usedNames);
        zip.file(name, r.result);
      });

      const zipBlob = await zip.generateAsync({ type: "blob" });
      downloadBlob(zipBlob, `imagens-convertidas-${toFormat}.zip`);
    } catch {
      setZipError("Não foi possível gerar o arquivo .zip. Tente novamente.");
    } finally {
      setIsZipping(false);
    }
  };

  const handleReset = () => {
    Object.values(results).forEach((r) => r.resultUrl && URL.revokeObjectURL(r.resultUrl));
    reset();
    setResults({});
    setProcessingIndex(null);
    setZipError(null);
  };

  const allDone =
    files.length > 0 && files.every((f) => results[f.id]?.status === "done" || results[f.id]?.status === "error");
  const allSucceeded = files.length > 0 && files.every((f) => results[f.id]?.status === "done");
  const errorCount = files.filter((f) => results[f.id]?.status === "error").length;

  return (
    <Layout>
      <SeoHead title={title} description={description} path={path} faq={faq} />

      <section className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="text-3xl font-bold text-ink">{title}</h1>
        <p className="mt-2 text-muted">{description}</p>

        <div className="mt-8">
          {files.length === 0 && (
            <DropZone
              isDragging={isDragging}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onSelectFiles={addFiles}
              multiple
            />
          )}

          {/* uma imagem: mesma experiência de sempre, sem lista, com download individual */}
          {files.length === 1 &&
            (() => {
              const item = files[0];
              const r = results[item.id];
              const showingResult = r?.status === "done" && !r.showOriginal;

              return (
                <div className="flex flex-col items-center gap-4">
                  <img
                    src={showingResult ? r!.resultUrl! : item.previewUrl}
                    alt={showingResult ? "Imagem convertida" : "Pré-visualização"}
                    className={`max-h-80 rounded-lg border ${showingResult ? "border-accent" : "border-border"}`}
                  />

                  {r?.status === "done" && (
                    <button
                      onClick={() => toggleOriginal(item.id)}
                      className="text-sm text-muted underline underline-offset-2"
                    >
                      {r.showOriginal ? "Ver imagem convertida" : "Ver imagem original"}
                    </button>
                  )}

                  <p className="font-mono text-xs text-muted">
                    {item.file.name} · {formatBytes(item.file.size)}
                  </p>

                  {r?.status === "error" && <p className="text-sm text-red-600">{r.error}</p>}

                  {r?.status !== "done" ? (
                    <button
                      onClick={convertAll}
                      disabled={isConverting}
                      className="rounded-full bg-accent px-6 py-2 font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
                    >
                      {isConverting ? "Convertendo..." : `Converter para ${toFormat.toUpperCase()}`}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDownload(item)}
                      className="rounded-full bg-success px-6 py-2 font-medium text-white transition-colors hover:bg-success-hover"
                    >
                      Baixar imagem {toFormat.toUpperCase()}
                    </button>
                  )}

                  <button onClick={handleReset} className="text-sm text-muted underline underline-offset-2">
                    Escolher outra imagem
                  </button>
                </div>
              );
            })()}

          {/* duas ou mais imagens: lista com progresso individual, download só via .zip ao final */}
          {files.length > 1 && (
            <div className="flex flex-col gap-4">
              <p className="text-sm text-muted">
                {files.length} de {maxFiles} imagens selecionadas
              </p>

              <ul className="flex flex-col gap-3">
                {files.map((item) => {
                  const r = results[item.id];
                  return (
                    <li key={item.id} className="rounded-xl border border-border p-3">
                      {(!r || r.status === "pending" || r.status === "converting") && (
                        <div className="flex items-center gap-3">
                          <img
                            src={item.previewUrl}
                            alt={item.file.name}
                            className="h-14 w-14 rounded object-cover"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm text-ink">{item.file.name}</p>
                            <p className="font-mono text-xs text-muted">
                              {r?.status === "converting" ? "Convertendo..." : formatBytes(item.file.size)}
                            </p>
                          </div>
                          {!isConverting && (
                            <button
                              onClick={() => removeFile(item.id)}
                              aria-label={`Remover ${item.file.name}`}
                              className="shrink-0 text-muted hover:text-accent"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      )}

                      {r?.status === "error" && (
                        <div className="flex items-center gap-3">
                          <img
                            src={item.previewUrl}
                            alt={item.file.name}
                            className="h-14 w-14 rounded object-cover opacity-50"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm text-ink">{item.file.name}</p>
                            <p className="text-xs text-red-600">{r.error}</p>
                          </div>
                        </div>
                      )}

                      {r?.status === "done" && r.resultUrl && (
                        <div className="flex flex-col items-center gap-3">
                          <img
                            src={r.showOriginal ? item.previewUrl : r.resultUrl}
                            alt={item.file.name}
                            className={`max-h-56 rounded-lg border ${
                              r.showOriginal ? "border-border" : "border-accent"
                            }`}
                          />
                          <p className="max-w-full truncate font-mono text-xs text-muted">{item.file.name}</p>
                          <button
                            onClick={() => toggleOriginal(item.id)}
                            className="text-sm text-muted underline underline-offset-2"
                          >
                            {r.showOriginal ? "Ver convertida" : "Ver original"}
                          </button>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>

              {!allDone && (
                <button
                  onClick={convertAll}
                  disabled={isConverting}
                  className="self-center rounded-full bg-accent px-6 py-2 font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
                >
                  {isConverting
                    ? `Convertendo ${(processingIndex ?? 0) + 1} de ${files.length}...`
                    : `Converter ${files.length} imagens para ${toFormat.toUpperCase()}`}
                </button>
              )}

              {allDone && allSucceeded && (
                <div className="flex flex-col items-center gap-3">
                  <button
                    onClick={handleDownloadZip}
                    disabled={isZipping}
                    className="rounded-full bg-success px-6 py-2 font-medium text-white transition-colors hover:bg-success-hover disabled:opacity-50"
                  >
                    {isZipping ? "Preparando .zip..." : `Baixar ${files.length} imagens (.zip)`}
                  </button>
                  {zipError && <p className="text-sm text-red-600">{zipError}</p>}
                  <button onClick={handleReset} className="text-sm text-muted underline underline-offset-2">
                    Converter outras imagens
                  </button>
                </div>
              )}

              {allDone && !allSucceeded && (
                <div className="flex flex-col items-center gap-3 text-center">
                  <p className="text-sm text-red-600">
                    {errorCount} de {files.length} imagens não puderam ser convertidas. Por isso o .zip com o lote
                    não pôde ser gerado.
                  </p>
                  <button onClick={handleReset} className="text-sm text-muted underline underline-offset-2">
                    Tentar novamente com outro lote
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <AdBanner position="tool-below-editor" className="my-10" />
        <AdBanner position="tool-above-faq" className="mb-8" />

        <FaqList items={faq} />
      </section>

      {/* Fase 1: conteúdo rico compartilhado com a Home, para equilibrar a densidade
          de texto em todas as rotas de conversão (thin content / AdSense). */}
      <div className="mx-auto max-w-5xl px-4 pb-14">
        <div className="mt-4">
          <HowItWorks />
        </div>

        <div className="mt-20">
          <WhyUseUs />
        </div>

        <div className="mt-20">
          <FormatComparisonTable />
        </div>

        <div className="mt-20">
          <FaqAccordion items={SITE_FAQ} title="Outras perguntas frequentes" />
        </div>
      </div>
    </Layout>
  );
}
