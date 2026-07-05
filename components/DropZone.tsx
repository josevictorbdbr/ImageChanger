import { ChangeEvent } from "react";

interface DropZoneProps {
  isDragging: boolean;
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onSelect: (file: File) => void;
  accept?: string;
}

export default function DropZone({
  isDragging,
  onDrop,
  onDragOver,
  onDragLeave,
  onSelect,
  accept = "image/*",
}: DropZoneProps) {
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onSelect(file);
  };

  return (
    <label
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed bg-dot-grid bg-dot-grid p-12 text-center transition-colors ${
        isDragging ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"
      }`}
    >
      <span className="font-medium text-ink">Arraste uma imagem aqui ou clique para selecionar</span>
      <span className="font-mono text-xs text-muted">PNG · JPG · WebP</span>
      <input type="file" accept={accept} className="hidden" onChange={handleInput} />
    </label>
  );
}
