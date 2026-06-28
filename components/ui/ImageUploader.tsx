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
    // <div className="relative inline-block group">
    //   <Avatar
    //     className={`
    //       ${avatarSize[size]}
    //       border-4
    //       border-white
    //       shadow-xl
    //       ring-1
    //       ring-pink-100
    //       overflow-hidden
    //     `}
    //   >
    //     <AvatarImage src={preview} className="object-cover" />

    //     <AvatarFallback className="bg-linear-to-br from-pink-100 via-rose-50 to-violet-100 text-pink-600 text-lg font-bold">
    //       {fallback
    //         .split(" ")
    //         .map((n) => n[0])
    //         .slice(0, 2)
    //         .join("")}
    //     </AvatarFallback>
    //   </Avatar>

    //   {editable && !disabled && (
    //     <>
    //       <button
    //         type="button"
    //         disabled={loading}
    //         onClick={() => inputRef.current?.click()}
    //         className="
    //           absolute
    //           inset-0
    //           rounded-full
    //           bg-black/0
    //           transition-all
    //           duration-300
    //           group-hover:bg-black/40
    //           flex
    //           items-center
    //           justify-center
    //           disabled:cursor-not-allowed
    //         "
    //       >
    //         {loading ? (
    //           <Loader2 className="h-6 w-6 animate-spin text-white" />
    //         ) : (
    //           <Camera className="h-6 w-6 text-white opacity-0 transition duration-300 group-hover:opacity-100" />
    //         )}
    //       </button>

    //       <input
    //         ref={inputRef}
    //         hidden
    //         type="file"
    //         accept=".jpg,.jpeg,.png,.webp"
    //         onChange={handleSelect}
    //       />
    //     </>
    //   )}
    // </div>

    <div className="inline-flex flex-col items-center gap-3">
      <div className="group relative">
        <Avatar
          className={`
          ${avatarSize[size]}
          overflow-hidden
          border-4
          border-white
          shadow-xl
          ring-1
          ring-pink-100
          transition-all
          duration-300
          ${editable ? "cursor-pointer group-hover:scale-[1.03]" : ""}
        `}
        >
          <AvatarImage
            src={preview}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          <AvatarFallback className="bg-linear-to-br from-pink-100 via-rose-50 to-violet-100 text-lg font-bold text-pink-600">
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
              flex
              flex-col
              items-center
              justify-center
              rounded-full
              bg-slate-900/0
              transition-all
              duration-300
              group-hover:bg-slate-900/45
              disabled:pointer-events-none
            "
            >
              {loading ? (
                <>
                  <Loader2 className="mb-2 h-6 w-6 animate-spin text-white" />
                  <span className="text-xs font-medium text-white">
                    Uploading...
                  </span>
                </>
              ) : (
                <div className="flex items-center opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <div className="rounded-full bg-white/20 p-2">
                    <Camera className="h-5 w-5 text-white" />
                  </div>
                </div>
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

      {editable && (
        <div className="space-y-1 text-center">
          <p className="text-xs font-medium text-slate-500">
            "JPG • PNG • WEBP • Max 1 MB"
          </p>

          <p className="text-[11px] text-slate-400">
            Click the photo to upload a new image
          </p>
        </div>
      )}
    </div>
  );
}
