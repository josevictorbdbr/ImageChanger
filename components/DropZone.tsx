import { ChangeEvent } from "react";

interface DropZoneProps {
  isDragging: boolean;
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onSelect?: (file: File) => void;
  onSelectFiles?: (files: File[]) => void;
  multiple?: boolean;
  accept?: string;
}

export default function DropZone({
  isDragging,
  onDrop,
  onDragOver,
  onDragLeave,
  onSelect,
  onSelectFiles,
  multiple = false,
  accept = "image/*",
}: DropZoneProps) {
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;
    if (multiple && onSelectFiles) {
      onSelectFiles(Array.from(fileList));
    } else if (onSelect) {
      onSelect(fileList[0]);
    }
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
      <span className="font-medium text-ink">
        {multiple ? "Arraste imagens aqui ou clique para selecionar" : "Arraste uma imagem aqui ou clique para selecionar"}
      </span>
      <span className="font-mono text-xs text-muted">
        {multiple ? "Até 5 imagens · PNG · JPG · WebP" : "PNG · JPG · WebP"}
      </span>
      <input type="file" accept={accept} multiple={multiple} className="hidden" onChange={handleInput} />
    </label>
  );
}

