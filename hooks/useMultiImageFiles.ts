import { useCallback, useState } from "react";

export interface ManagedFile {
  id: string;
  file: File;
  previewUrl: string;
}

const MAX_FILES = 5;

export function useMultiImageFiles() {
  const [files, setFiles] = useState<ManagedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const addFiles = useCallback((newFiles: File[]) => {
    setFiles((prev) => {
      const room = MAX_FILES - prev.length;
      if (room <= 0) return prev;
      const accepted = newFiles.slice(0, room).map((file) => ({
        id: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2, 7)}`,
        file,
        previewUrl: URL.createObjectURL(file),
      }));
      return [...prev, ...accepted];
    });
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => {
      const target = prev.find((f) => f.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((f) => f.id !== id);
    });
  }, []);

  const reset = useCallback(() => {
    setFiles((prev) => {
      prev.forEach((f) => URL.revokeObjectURL(f.previewUrl));
      return [];
    });
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      addFiles(Array.from(e.dataTransfer.files || []));
    },
    [addFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setIsDragging(false), []);

  return {
    files,
    isDragging,
    addFiles,
    removeFile,
    reset,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    maxFiles: MAX_FILES,
  };
}
