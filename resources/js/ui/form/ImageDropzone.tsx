import React, { useCallback, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import ErrorText from "@/typography/ErrorText";

export type PreviewItem = { id: string; url: string; name: string };

type Props = {
  files: File[]; // controlled files
  setFiles: (updater: (prev: File[]) => File[]) => void;
  previews: PreviewItem[]; // controlled previews
  setPreviews: (updater: (prev: PreviewItem[]) => PreviewItem[]) => void;
  label?: string;
  error?: string | null;
  maxFiles?: number;
  maxSizeBytes?: number;
  accept?: { [mime: string]: string[] };
  showHint?: boolean;
  name?: string; // unique input name per instance (optional)
};

export default function ImageDropzone({
  files,
  setFiles,
  previews,
  setPreviews,
  label,
  error = null,
  maxFiles = 10,
  maxSizeBytes = 5 * 1024 * 1024,
  accept = { "image/*": [".jpeg", ".jpg", ".png", ".webp", ".gif"] },
  showHint = true,
  name = "images[]",
}: Props) {
  // Track URLs created by this instance so we can revoke them safely.
  const createdUrlsRef = useRef<string[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) return;

      // limit to maxFiles
      const room = Math.max(0, maxFiles - files.length);
      const toAdd = acceptedFiles.slice(0, room);

      setFiles((prev) => [...prev, ...toAdd]);

      const newPreviews = toAdd.map((f) => {
        const url = URL.createObjectURL(f);
        // store the url so we can revoke on removal/unmount
        createdUrlsRef.current.push(url);

        const id =
          typeof crypto !== "undefined" && "randomUUID" in crypto
            ? (crypto as any).randomUUID()
            : `${f.name}-${f.size}-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;

        return {
          id,
          url,
          name: f.name,
        } as PreviewItem;
      });

      setPreviews((p) => [...p, ...newPreviews]);
    },
    [files.length, maxFiles, setFiles, setPreviews]
  );

  // Optional: you may want to handle rejections to show errors. For brevity we skip that,
  // but `onDropRejected` from useDropzone can be used.

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize: maxSizeBytes,
  });

  // cleanup created object URLs on unmount
  useEffect(() => {
    return () => {
      createdUrlsRef.current.forEach((url) => {
        try {
          URL.revokeObjectURL(url);
        } catch {}
      });
      createdUrlsRef.current = [];
    };
  }, []);

  const removeFileAt = (index: number) => {
    // Revoke the corresponding object URL (if created by this instance)
    const preview = previews[index];
    if (preview) {
      try {
        URL.revokeObjectURL(preview.url);
      } catch {}
      // remove from createdUrlsRef as well (defensive)
      createdUrlsRef.current = createdUrlsRef.current.filter((u) => u !== preview.url);
    }

    setFiles((f) => f.filter((_, i) => i !== index));
    setPreviews((p) => p.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      {label && <label className="small-1stop mb-1 text-gray-800">{label}</label>}

      <div
        {...getRootProps()}
        className={`border-dashed border-2 rounded-md py-5 px-3 text-center text-gray-500 text-xs cursor-pointer transition-colors ${
          isDragActive ? "border-indigo-300 bg-indigo-50" : "hover:border-gray-300"
        }`}
      >
        <input {...getInputProps({ name, multiple: true })} />

        <div>
          <strong>Drag & drop</strong> or click to upload{" "}
          {showHint ? `(up to ${maxFiles} files, max ${(maxSizeBytes / (1024 * 1024)).toFixed(1)}MB each)` : ""}
        </div>
      </div>

      {error && <ErrorText>{error}</ErrorText>}

      {previews.length > 0 && (
        <div className="mt-3 grid grid-cols-3 sm:grid-cols-6 gap-2">
          {previews.map((p, i) => (
            <div key={p.id} className="relative rounded border overflow-hidden">
              <img src={p.url} className="w-full h-20 object-cover" alt={p.name} />
              <button
                type="button"
                onClick={() => removeFileAt(i)}
                className="absolute top-1 right-1 bg-black/50 text-white text-xs rounded px-1"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
