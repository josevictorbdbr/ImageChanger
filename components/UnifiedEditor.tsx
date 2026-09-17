import { useState } from "react";
import { useRouter } from "next/router";
import DropZone from "./DropZone";
import CropSelector from "./CropSelector";
import { useImageFile } from "../hooks/useImageFile";
import { useObjectUrl } from "../hooks/useObjectUrl";
import { cropImage, resizeImage, compressImage, rotateImage, flipImage, CropArea } from "../tools/imageEditor";
import { downloadBlob } from "../utils/downloadFile";
import { formatBytes } from "../utils/formatBytes";
import { useLocale } from "../utils/i18n";
import { editarImagemText } from "../locales/pages/editar-imagem";

const TOOL_KEYS = ["cortar", "redimensionar", "comprimir", "girar", "espelhar"] as const;
type ToolKey = (typeof TOOL_KEYS)[number];

interface Dimensions {
  width: number;
  height: number;
}

// Une as 5 ferramentas que antes eram páginas separadas
export default function UnifiedEditor() {
  const locale = useLocale();
  const t = editarImagemText[locale];
  const router = useRouter();

  const queryTool = typeof router.query.ferramenta === "string" ? router.query.ferramenta : undefined;
  const initialTool: ToolKey = (TOOL_KEYS as readonly string[]).includes(queryTool ?? "")
    ? (queryTool as ToolKey)
    : "cortar";

  const [activeTool, setActiveTool] = useState<ToolKey>(initialTool);
  const { file, previewUrl, isDragging, selectFile, reset, handleDrop, handleDragOver, handleDragLeave } =
    useImageFile();

  // estado específico de cada ferramenta
  const [area, setArea] = useState<CropArea>({ x: 0, y: 0, width: 0, height: 0 });
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [quality, setQuality] = useState(0.7);
  const [angle, setAngle] = useState<90 | 180 | 270>(90);
  const [direction, setDirection] = useState<"horizontal" | "vertical">("horizontal");

  // estado compartilhado
  const [result, setResult] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);
  const [dimensions, setDimensions] = useState<Dimensions | null>(null);
  const resultUrl = useObjectUrl(result);

  const tt = t.tools[activeTool];

  const handleToolChange = (tool: ToolKey) => {
    setActiveTool(tool);
    setResult(null);
    setShowOriginal(false);
  };

  const handlePreviewLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    if (naturalWidth && naturalHeight) setDimensions({ width: naturalWidth, height: naturalHeight });
  };

  const handleApply = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      let blob: Blob;
      switch (activeTool) {
        case "cortar":
          blob = await cropImage(file, area);
          break;
        case "redimensionar":
          blob = await resizeImage(file, width, height);
          break;
        case "comprimir":
          blob = await compressImage(file, quality);
          break;
        case "girar":
          blob = await rotateImage(file, angle);
          break;
        case "espelhar":
          blob = await flipImage(file, direction);
          break;
      }
      setResult(blob);
    } catch {
      alert(tt.errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result || !file) return;
    const name = file.name.replace(/\.[^.]+$/, "");
    const ext = activeTool === "comprimir" ? "jpg" : file.name.split(".").pop() ?? "png";
    downloadBlob(result, `${name}-${tt.downloadSuffix}.${ext}`);
  };

  const handleReset = () => {
    reset();
    setResult(null);
    setShowOriginal(false);
    setDimensions(null);
  };

  const showsDimensions = activeTool === "comprimir" || activeTool === "redimensionar";

  return (
    <>
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
          {activeTool === "cortar" && !result ? (
            <>
              <CropSelector imageUrl={previewUrl} onChange={setArea} />
              <p className="font-mono text-xs text-muted">
                {area.width} × {area.height}px
              </p>
            </>
          ) : (
            <img
              src={resultUrl && !showOriginal ? resultUrl : previewUrl}
              alt={resultUrl && !showOriginal ? tt.resultAlt : t.previewAlt}
              onLoad={handlePreviewLoad}
              className={`max-h-80 rounded-lg border ${
                resultUrl && !showOriginal ? "border-accent" : "border-border"
              }`}
            />
          )}

          {resultUrl && (
            <button
              onClick={() => setShowOriginal((v) => !v)}
              className="text-sm text-muted underline underline-offset-2"
            >
              {showOriginal ? tt.viewResultLabel : t.viewOriginal}
            </button>
          )}

          {showsDimensions && dimensions && (
            <p className="font-mono text-xs text-muted">
              {activeTool === "comprimir"
                ? `${t.original}: ${formatBytes(file.size)} · ${dimensions.width}×${dimensions.height}`
                : `${showOriginal || !resultUrl ? t.original : t.tools.redimensionar.resizedLabel}: ${dimensions.width}×${dimensions.height}`}
            </p>
          )}

          {/* seletor de ferramenta*/}
          <div className="flex flex-wrap justify-center gap-2">
            {TOOL_KEYS.map((key) => (
              <button
                key={key}
                onClick={() => handleToolChange(key)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                  activeTool === key ? "bg-accent text-white" : "border border-border text-muted"
                }`}
              >
                {t.tools[key].tabLabel}
              </button>
            ))}
          </div>

          {/* controles específicos da ferramenta selecionada */}
          {activeTool === "comprimir" && (
            <label className="flex w-full max-w-xs flex-col text-sm text-muted">
              {t.tools.comprimir.qualityLabel}: {Math.round(quality * 100)}%
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
          )}

          {activeTool === "redimensionar" && (
            <div className="flex items-center gap-3">
              <label className="flex flex-col text-sm text-muted">
                {t.tools.redimensionar.widthLabel}
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="mt-1 w-28 rounded-lg border border-border px-3 py-1.5"
                />
              </label>
              <label className="flex flex-col text-sm text-muted">
                {t.tools.redimensionar.heightLabel}
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="mt-1 w-28 rounded-lg border border-border px-3 py-1.5"
                />
              </label>
            </div>
          )}

          {activeTool === "girar" && (
            <div className="flex gap-2">
              {([90, 180, 270] as const).map((a) => (
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
          )}

          {activeTool === "espelhar" && (
            <div className="flex gap-2">
              {(["horizontal", "vertical"] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setDirection(d)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                    direction === d ? "bg-accent text-white" : "border border-border text-muted"
                  }`}
                >
                  {d === "horizontal" ? t.tools.espelhar.horizontal : t.tools.espelhar.vertical}
                </button>
              ))}
            </div>
          )}

          {/* aplicar / baixar */}
          {!result ? (
            <button
              onClick={handleApply}
              disabled={isProcessing || (activeTool === "cortar" && !area.width)}
              className="rounded-full bg-accent px-6 py-2 font-medium text-white hover:bg-accent-hover disabled:opacity-50"
            >
              {isProcessing ? t.processing : tt.applyButton}
            </button>
          ) : (
            <div className="flex flex-col items-center gap-2">
              {activeTool === "comprimir" && (
                <p className="font-mono text-xs text-muted">
                  {t.tools.comprimir.newSize}: {formatBytes(result.size)}
                </p>
              )}
              <button
                onClick={handleDownload}
                className="rounded-full bg-success px-6 py-2 font-medium text-white hover:bg-success-hover"
              >
                {t.downloadButton}
              </button>
            </div>
          )}

          <button onClick={handleReset} className="text-sm text-muted underline underline-offset-2">
            {t.chooseAnother}
          </button>
        </div>
      )}
    </>
  );
}
