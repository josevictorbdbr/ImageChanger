import { useCallback, useState } from "react";

export function useImageFile() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const selectFile = useCallback((newFile: File) => {
    setFile(newFile);
    setPreviewUrl(URL.createObjectURL(newFile));
  }, []);

  const reset = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
  }, [previewUrl]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const dropped = e.dataTransfer.files?.[0];
      if (dropped) selectFile(dropped);
    },
    [selectFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setIsDragging(false), []);

  return {
    file,
    previewUrl,
    isDragging,
    selectFile,
    reset,
    handleDrop,
    handleDragOver,
    handleDragLeave,
  };
}
