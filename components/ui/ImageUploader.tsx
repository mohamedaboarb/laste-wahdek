"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { storageService } from "@/features/storage/storage.service";

interface ImageUploaderProps {
  imageUrl?: string | null;
  fallback: string;

  editable?: boolean;
  disabled?: boolean;
  loading?: boolean;

  size?: "sm" | "md" | "lg";

  onChange?: (file: File) => void;
}

export function ImageUploader({
  imageUrl,
  fallback,
  editable = false,
  disabled = false,
  loading = false,
  onChange,
  size = "md",
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | undefined>(
    imageUrl ?? undefined,
  );

  useEffect(() => {
    setPreview(imageUrl ?? undefined);
  }, [imageUrl]);

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  function handleSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      storageService.validateImage(file);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Invalid file.");
      return;
    }

    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    const objectUrl = URL.createObjectURL(file);

    setPreview(objectUrl);

    onChange?.(file);
  }

  const avatarSize = {
    sm: "h-16 w-16",
    md: "h-20 w-20",
    lg: "h-28 w-28",
  };

  return (
    <div className="relative inline-block group">
      <Avatar
        className={`
          ${avatarSize[size]}
          border-4
          border-white
          shadow-xl
          ring-1
          ring-pink-100
          overflow-hidden
        `}
      >
        <AvatarImage src={preview} className="object-cover" />

        <AvatarFallback className="bg-gradient-to-br from-pink-100 via-rose-50 to-violet-100 text-pink-600 text-lg font-bold">
          {fallback
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")}
        </AvatarFallback>
      </Avatar>

      {editable && !disabled && (
        <>
          <button
            type="button"
            disabled={loading}
            onClick={() => inputRef.current?.click()}
            className="
              absolute
              inset-0
              rounded-full
              bg-black/0
              transition-all
              duration-300
              group-hover:bg-black/40
              flex
              items-center
              justify-center
              disabled:cursor-not-allowed
            "
          >
            {loading ? (
              <Loader2 className="h-6 w-6 animate-spin text-white" />
            ) : (
              <Camera className="h-6 w-6 text-white opacity-0 transition duration-300 group-hover:opacity-100" />
            )}
          </button>

          <input
            ref={inputRef}
            hidden
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={handleSelect}
          />
        </>
      )}
    </div>
  );
}
