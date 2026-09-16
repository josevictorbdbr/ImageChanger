import { ChangeEvent } from "react";
import { useLocale } from "../utils/i18n";
import { common } from "../locales/common";

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
  const locale = useLocale();
  const t = common[locale];

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
      className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-blue-400 bg-dot-grid bg-dot-grid p-12 text-center transition-colors hover:bg-blue-500/10 ${
        isDragging ? "bg-blue-500/10" : ""
      }`}
    >
      <span className="font-medium text-ink">{multiple ? t.dropZoneMultiple : t.dropZoneSingle}</span>
      <span className="font-mono text-xs text-muted">{multiple ? t.dropZoneHintMultiple : t.dropZoneHintSingle}</span>
      <input type="file" accept={accept} multiple={multiple} className="hidden" onChange={handleInput} />
    </label>
  );
}
