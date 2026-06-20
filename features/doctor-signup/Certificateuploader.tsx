"use client";

import { useRef, useState, useCallback } from "react";
import {
  Upload,
  X,
  FileText,
  Image as ImageIcon,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/contexts/locale-context";

interface CertificateUploaderProps {
  onChange: (files: FileList | null) => void;
  error?: string;
}

interface PreviewFile {
  name: string;
  size: number;
  type: string;
  previewUrl: string | null; // null for PDFs
}

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];
const MAX_SIZE_MB = 10;

function formatSize(bytes: number): string {
  return bytes < 1024 * 1024
    ? `${(bytes / 1024).toFixed(0)} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function CertificateUploader({
  onChange,
  error,
}: CertificateUploaderProps) {
  const { t } = useLocale();
  const inputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<PreviewFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [clientErrors, setClientErrors] = useState<string[]>([]);

  // ── منطق معالجة الملفات (لم يتم لمسه تماماً لحماية استقرار الفورم) ───────────────────────────
  const processFiles = useCallback(
    (incoming: FileList | null) => {
      if (!incoming || incoming.length === 0) return;

      const errors: string[] = [];
      const valid: File[] = [];

      Array.from(incoming).forEach((file) => {
        if (!ALLOWED_TYPES.includes(file.type)) {
          errors.push(`"${file.name}" — ${t.common.unsupportedFile}`);
          return;
        }
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
          errors.push(`"${file.name}" — ${t.common.exceed} ${MAX_SIZE_MB} MB`);
          return;
        }
        valid.push(file);
      });

      setClientErrors(errors);

      if (valid.length === 0) return;

      const newPreviews: PreviewFile[] = valid.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        previewUrl: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : null,
      }));

      setPreviews((prev) => [...prev, ...newPreviews]);

      const dt = new DataTransfer();
      if (inputRef.current?.files) {
        Array.from(inputRef.current.files).forEach((f) => dt.items.add(f));
      }
      valid.forEach((f) => dt.items.add(f));

      if (inputRef.current) {
        inputRef.current.files = dt.files;
      }
      onChange(dt.files);
    },
    [onChange, t],
  );

  const removeFile = (index: number) => {
    setPreviews((prev) => {
      const updated = [...prev];
      const removed = updated.splice(index, 1)[0];
      if (removed.previewUrl) URL.revokeObjectURL(removed.previewUrl);
      return updated;
    });

    const dt = new DataTransfer();
    if (inputRef.current?.files) {
      Array.from(inputRef.current.files)
        .filter((_, i) => i !== index)
        .forEach((f) => dt.items.add(f));
    }
    if (inputRef.current) inputRef.current.files = dt.files;
    onChange(dt.files.length > 0 ? dt.files : null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  };

  return (
    <div className="space-y-3 w-full">
      {/* 📥 منطقة السحب والإفلات المحدثة بهوية Zinc/Glass الداكنة */}
      <div
        role="button"
        tabIndex={0}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-4 py-8 text-center transition-all duration-200 outline-none",
          "focus-visible:ring-1 focus-visible:ring-purple-500 focus-visible:border-purple-500",
          isDragging
            ? "border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/5 scale-[1.01]"
            : error
              ? "border-red-500/50 bg-red-500/5"
              : "border-zinc-800 bg-zinc-900/40 hover:border-purple-500/50 hover:bg-purple-500/5",
        )}
      >
        {/* أيقونة الرفع الدائرية */}
        <div
          className={cn(
            "flex size-12 items-center justify-center rounded-full transition-colors duration-200",
            isDragging ? "bg-purple-500/20" : "bg-zinc-800/80",
          )}
        >
          <Upload
            className={cn(
              "size-5 transition-colors duration-200",
              isDragging ? "text-purple-400" : "text-zinc-400",
            )}
            aria-hidden="true"
          />
        </div>

        {/* النصوص الإرشادية */}
        <div>
          <p className="text-sm font-medium text-zinc-200">
            {t.register.doctorFields.uploadZoneText}
            <span className="ms-1 text-purple-400 font-semibold underline-offset-4 hover:underline transition-all">
              {t.register.doctorFields.uploadZoneLink}
            </span>
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            {t.register.doctorFields.uploadZoneHint}
          </p>
        </div>

        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.webp,.pdf"
          className="sr-only"
          onChange={(e) => processFiles(e.target.files)}
          aria-hidden="true"
        />
      </div>

      {/* ⚠️ رسائل الخطأ المحلية للمتصفح */}
      {clientErrors.map((err, i) => (
        <p
          key={i}
          className="text-xs text-red-400 font-medium flex items-center gap-1.5 animate-in fade-in duration-200"
          role="alert"
        >
          <AlertCircle className="size-3.5 shrink-0" />
          {err}
        </p>
      ))}

      {/* 🔴 رسائل خطأ التحقق الخلفي (RHF / Zod) */}
      {error && (
        <p
          className="flex items-center gap-1.5 text-xs text-red-400 font-medium mt-1 animate-in fade-in duration-200"
          role="alert"
        >
          <AlertCircle className="size-3.5 shrink-0" />
          {error}
        </p>
      )}

      {/* 📄 قائمة ملفات المعاينة المرفوعة */}
      {previews.length > 0 && (
        <ul className="space-y-2 pt-1">
          {previews.map((file, idx) => (
            <li
              key={`${file.name}-${idx}`}
              className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/60 backdrop-blur-md px-3 py-2 text-white transition-all hover:border-zinc-700/80 animate-in slide-in-from-top-2 duration-200"
            >
              {/* صورة مصغرة للملف أو أيقونة افتراضية للـ PDF */}
              {file.previewUrl ? (
                <img
                  src={file.previewUrl}
                  alt={file.name}
                  className="size-10 rounded object-cover border border-zinc-800 shadow-inner"
                />
              ) : (
                <div className="flex size-10 items-center justify-center rounded bg-zinc-800 text-zinc-400 border border-zinc-700/50">
                  <FileText className="size-5" aria-hidden="true" />
                </div>
              )}

              {/* بيانات الملف وحجمه */}
              <div className="min-w-0 flex-1 text-right">
                <p className="truncate text-sm font-medium text-zinc-200">
                  {file.name}
                </p>
                <p className="text-xs text-zinc-500 mt-0.5">
                  {formatSize(file.size)}
                </p>
              </div>

              {/* زر الحذف الفوري للملف */}
              <button
                type="button"
                onClick={() => removeFile(idx)}
                aria-label={`حذف ${file.name}`}
                className="shrink-0 rounded-full p-1 text-zinc-500 transition-colors hover:bg-red-500/10 hover:text-red-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500 active:scale-95"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
