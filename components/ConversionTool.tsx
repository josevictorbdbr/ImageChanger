import { useState } from "react";
import JSZip from "jszip";
import Layout from "./Layout";
import DropZone from "./DropZone";
import SeoHead from "./SeoHead";
import { useMultiImageFiles, ManagedFile } from "../hooks/useMultiImageFiles";
import { convertImage, ImageFormat } from "../tools/imageConverter";
import { downloadBlob } from "../utils/downloadFile";
import { formatBytes, replaceExtension } from "../utils/formatBytes";
import { useLocale } from "../utils/i18n";
import { conversionToolText } from "../locales/conversionTool";

interface ConversionToolProps {
  title: string;
  description: string;
  path: string;
  toFormat: ImageFormat;
  about?: string[];
  aboutTitle?: string;
}

type Status = "pending" | "converting" | "done" | "error";

interface FileResult {
  status: Status;
  result?: Blob;
  resultUrl?: string;
  error?: string;
  showOriginal: boolean;
}

interface Dimensions {
  width: number;
  height: number;
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

export default function ConversionTool({
  title,
  description,
  path,
  toFormat,
  about,
  aboutTitle,
}: ConversionToolProps) {
  const locale = useLocale();
  const t = conversionToolText[locale];
  const resolvedAboutTitle = aboutTitle ?? t.aboutTitleDefault;

  const { files, isDragging, addFiles, removeFile, reset, handleDrop, handleDragOver, handleDragLeave, maxFiles } =
    useMultiImageFiles();
  const [results, setResults] = useState<Record<string, FileResult>>({});
  const [dimensions, setDimensions] = useState<Record<string, Dimensions>>({});
  const [isConverting, setIsConverting] = useState(false);
  const [processingIndex, setProcessingIndex] = useState<number | null>(null);
  const [isZipping, setIsZipping] = useState(false);
  const [zipError, setZipError] = useState<string | null>(null);

  // lê a dimensão real da imagem a partir do próprio <img> de preview já renderizado,
  // sem precisar carregar o arquivo de novo ou usar outra API
  const handlePreviewLoad = (id: string) => (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    if (!naturalWidth || !naturalHeight) return;
    setDimensions((prev) => ({ ...prev, [id]: { width: naturalWidth, height: naturalHeight } }));
  };

  const formatMeta = (item: ManagedFile, sizeOverride?: number) => {
    const dim = dimensions[item.id];
    const size = formatBytes(sizeOverride ?? item.file.size);
    return dim ? `${size} · ${dim.width}×${dim.height}` : size;
  };

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
          [item.id]: { status: "error", error: t.conversionError, showOriginal: false },
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
      setZipError(t.zipError);
    } finally {
      setIsZipping(false);
    }
  };

  const handleReset = () => {
    Object.values(results).forEach((r) => r.resultUrl && URL.revokeObjectURL(r.resultUrl));
    reset();
    setResults({});
    setDimensions({});
    setProcessingIndex(null);
    setZipError(null);
  };

  const allDone =
    files.length > 0 && files.every((f) => results[f.id]?.status === "done" || results[f.id]?.status === "error");
  const allSucceeded = files.length > 0 && files.every((f) => results[f.id]?.status === "done");
  const errorCount = files.filter((f) => results[f.id]?.status === "error").length;

  return (
    <Layout>
      <SeoHead title={title} description={description} path={path} />

      {/* Hero no mesmo padrão das páginas-hub: fundo pontilhado, só o título */}
      <section className="bg-dot-grid bg-dot-grid border-b border-border">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center">
          <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl">{title}</h1>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-4 py-10">
        <div className="mt-2">
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

          {/* qualquer quantidade de imagens (1 ou mais): mesma lista compacta.
              Foco visual grande fica reservado para as ferramentas de edição. */}
          {files.length > 0 && (
            <div className="flex flex-col gap-4">
              {files.length > 1 && <p className="text-sm text-muted">{t.filesSelected(files.length, maxFiles)}</p>}

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
                            onLoad={handlePreviewLoad(item.id)}
                            className="h-16 w-16 shrink-0 rounded object-cover"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm text-ink">{item.file.name}</p>
                            <p className="font-mono text-xs text-muted">
                              {r?.status === "converting" ? t.converting : formatMeta(item)}
                            </p>
                          </div>
                          {!isConverting && (
                            <button
                              onClick={() => removeFile(item.id)}
                              aria-label={t.removeAria(item.file.name)}
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
                            className="h-16 w-16 shrink-0 rounded object-cover opacity-50"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm text-ink">{item.file.name}</p>
                            <p className="text-xs text-red-600">{r.error}</p>
                          </div>
                        </div>
                      )}

                      {r?.status === "done" && r.resultUrl && (
                        <div className="flex items-center gap-3">
                          <img
                            src={r.resultUrl}
                            alt={item.file.name}
                            onLoad={handlePreviewLoad(item.id)}
                            className="h-16 w-16 shrink-0 rounded border-2 border-accent object-cover"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm text-ink">{item.file.name}</p>
                            <p className="font-mono text-xs text-muted">
                              {r.showOriginal ? t.original : t.converted}:{" "}
                              {formatMeta(item, r.showOriginal ? undefined : r.result?.size)}
                            </p>
                          </div>
                          <div className="flex shrink-0 items-center gap-2">
                            <button
                              onClick={() => toggleOriginal(item.id)}
                              className="text-xs text-muted underline underline-offset-2"
                            >
                              {r.showOriginal ? t.viewConverted : t.viewOriginal}
                            </button>

                            <button
                              onClick={() => handleDownload(item)}
                              className="rounded-full bg-success px-5 py-2 text-sm font-medium text-white hover:bg-success-hover"
                            >
                              {t.download}
                            </button>
                          </div>
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
                    ? files.length > 1
                      ? t.convertingMultiple((processingIndex ?? 0) + 1, files.length)
                      : t.converting
                    : files.length > 1
                    ? t.convertMultipleButton(files.length, toFormat.toUpperCase())
                    : t.convertSingleButton(toFormat.toUpperCase())}
                </button>
              )}

              {allDone && (
                <div className="flex flex-col items-center gap-3">
                  {files.length > 1 && allSucceeded && (
                    <button
                      onClick={handleDownloadZip}
                      disabled={isZipping}
                      className="rounded-full bg-success px-6 py-2 font-medium text-white transition-colors hover:bg-success-hover disabled:opacity-50"
                    >
                      {isZipping ? t.zipPreparing : t.zipDownloadAll}
                    </button>
                  )}

                  {zipError && <p className="text-sm text-red-600">{zipError}</p>}

                  {files.length > 1 && !allSucceeded && (
                    <p className="text-center text-sm text-red-600">{t.partialErrorMessage(errorCount, files.length)}</p>
                  )}

                  <button onClick={handleReset} className="text-sm text-muted underline underline-offset-2">
                    {t.convertAgain}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
