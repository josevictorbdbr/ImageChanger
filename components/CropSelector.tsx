import { useEffect, useRef, useState } from "react";
import { CropArea } from "../tools/imageEditor";

interface CropSelectorProps {
  imageUrl: string;
  onChange: (area: CropArea) => void;
}

type Handle = "move" | "nw" | "ne" | "sw" | "se";
type Box = { x: number; y: number; width: number; height: number };

const MIN_SIZE = 20;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function CropSelector({ imageUrl, onChange }: CropSelectorProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const dragRef = useRef<{ handle: Handle; startX: number; startY: number; startBox: Box } | null>(null);

  const [displaySize, setDisplaySize] = useState({ width: 0, height: 0 });
  const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 });
  const [box, setBox] = useState<Box>({ x: 0, y: 0, width: 0, height: 0 });

  const handleImageLoad = () => {
    const img = imgRef.current;
    if (!img) return;
    const { width, height } = img.getBoundingClientRect();
    setDisplaySize({ width, height });
    setNaturalSize({ width: img.naturalWidth, height: img.naturalHeight });

    const boxWidth = width * 0.6;
    const boxHeight = height * 0.6;
    setBox({ x: (width - boxWidth) / 2, y: (height - boxHeight) / 2, width: boxWidth, height: boxHeight });
  };

  // converte a seleção (em pixels exibidos) para pixels reais da imagem original
  useEffect(() => {
    if (!displaySize.width || !naturalSize.width) return;
    const scaleX = naturalSize.width / displaySize.width;
    const scaleY = naturalSize.height / displaySize.height;
    onChange({
      x: Math.round(box.x * scaleX),
      y: Math.round(box.y * scaleY),
      width: Math.round(box.width * scaleX),
      height: Math.round(box.height * scaleY),
    });
  }, [box, displaySize, naturalSize, onChange]);

  const startDrag = (handle: Handle) => (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    (e.target as Element).setPointerCapture(e.pointerId);
    dragRef.current = { handle, startX: e.clientX, startY: e.clientY, startBox: box };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    if (!drag) return;

    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    let { x, y, width, height } = drag.startBox;

    if (drag.handle === "move") {
      x = clamp(drag.startBox.x + dx, 0, displaySize.width - width);
      y = clamp(drag.startBox.y + dy, 0, displaySize.height - height);
    } else {
      if (drag.handle.includes("e")) width = clamp(drag.startBox.width + dx, MIN_SIZE, displaySize.width - x);
      if (drag.handle.includes("s")) height = clamp(drag.startBox.height + dy, MIN_SIZE, displaySize.height - y);
      if (drag.handle.includes("w")) {
        const newWidth = clamp(drag.startBox.width - dx, MIN_SIZE, drag.startBox.x + drag.startBox.width);
        x = drag.startBox.x + (drag.startBox.width - newWidth);
        width = newWidth;
      }
      if (drag.handle.includes("n")) {
        const newHeight = clamp(drag.startBox.height - dy, MIN_SIZE, drag.startBox.y + drag.startBox.height);
        y = drag.startBox.y + (drag.startBox.height - newHeight);
        height = newHeight;
      }
    }

    setBox({ x, y, width, height });
  };

  const endDrag = () => {
    dragRef.current = null;
  };

  // Posições com suporte a mobile (offsets de -3 / -12px) e desktop (offsets de -1.5 / -7px)
  const corners: { key: Handle; className: string }[] = [
    { key: "nw", className: "-left-3 -top-3 md:-left-1.5 md:-top-1.5 cursor-nwse-resize" },
    { key: "ne", className: "-right-3 -top-3 md:-right-1.5 md:-top-1.5 cursor-nesw-resize" },
    { key: "sw", className: "-left-3 -bottom-3 md:-left-1.5 md:-bottom-1.5 cursor-nesw-resize" },
    { key: "se", className: "-right-3 -bottom-3 md:-right-1.5 md:-bottom-1.5 cursor-nwse-resize" },
  ];

  return (
    <div className="relative inline-block touch-none select-none">
      <img
        ref={imgRef}
        src={imageUrl}
        alt="Pré-visualização"
        onLoad={handleImageLoad}
        draggable={false}
        className="max-h-80 rounded-lg border border-border"
      />

      {displaySize.width > 0 && (
        <div
          onPointerDown={startDrag("move")}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className="absolute cursor-move border-2 border-accent bg-accent/10"
          style={{ left: box.x, top: box.y, width: box.width, height: box.height }}
        >
          {corners.map(({ key, className }) => (
            <div
              key={key}
              onPointerDown={startDrag(key)}
              onPointerMove={handlePointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              className={`absolute h-6 w-6 md:h-3.5 md:w-3.5 rounded-full border-2 border-white bg-accent shadow ${className}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}