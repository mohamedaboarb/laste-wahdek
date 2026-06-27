import { createClient } from "@/lib/supabase/client";

const BUCKET_NAME = "images";

export const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 1 MB (exclusive upper bound)

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
] as const;

export const ALLOWED_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
] as const;

// Maps browser MIME types to canonical storage extensions, normalizing
// variants like .jfif (reported as "image/jpeg") to a predictable filename.
const MIME_TO_EXTENSION: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export type ImageFolder = "images" | "certificates";

const supabase = createClient();

class StorageService {
  // Single source of truth for file validation — called before every upload
  // and re-used by the UI layer for immediate user feedback.
  validateImage(file: File): void {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type as any)) {
      throw new Error("Only JPG, PNG and WEBP images are allowed.");
    }

    const ext = "." + (file.name.split(".").pop()?.toLowerCase() ?? "");
    if (!ALLOWED_EXTENSIONS.includes(ext as any)) {
      throw new Error("Only .jpg, .jpeg, .png and .webp files are allowed.");
    }

    if (file.size >= MAX_IMAGE_SIZE) {
      throw new Error("Image size must be less than 1 MB.");
    }
  }

  generateImagePath(folder: ImageFolder, id: string, file: File): string {
    const extension = MIME_TO_EXTENSION[file.type] ?? "jpg";
    return `${folder}/${id}/avatar.${extension}`;
  }

  // Uploads the new image only. The caller must clean up stale files after
  // confirming the database update succeeded (see cleanupFolder).
  async uploadImage({
    folder,
    id,
    file,
  }: {
    folder: ImageFolder;
    id: string;
    file: File;
  }): Promise<string> {
    this.validateImage(file);

    const imagePath = this.generateImagePath(folder, id, file);

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(imagePath, file, {
        upsert: true,
        // "no-cache" makes the browser revalidate with the CDN on every
        // request (conditional GET). The CDN returns 304 if unchanged,
        // or fresh bytes when the file was replaced via upsert. This
        // ensures stale bytes are never served after a re-upload.
        cacheControl: "no-cache",
      });

    if (error) {
      throw new Error(error.message);
    }

    return imagePath;
  }

  // Removes every file in the child's folder except keepPath.
  // Called after a successful upload + database update to eliminate stale
  // avatar files left by prior uploads with different extensions.
  async cleanupFolder(
    folder: ImageFolder,
    id: string,
    keepPath: string,
  ): Promise<void> {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list(`${folder}/${id}`);

    if (error || !data || data.length === 0) return;

    const toDelete = data
      .map((f) => `${folder}/${id}/${f.name}`)
      .filter((path) => path !== keepPath);

    if (toDelete.length === 0) return;

    const { error: removeError } = await supabase.storage
      .from(BUCKET_NAME)
      .remove(toDelete);

    if (removeError) {
      throw new Error(removeError.message);
    }
  }

  async deleteImage(path: string): Promise<void> {
    const { error } = await supabase.storage.from(BUCKET_NAME).remove([path]);

    if (error) {
      throw new Error(error.message);
    }
  }

  // version is an in-session timestamp set after each upload.
  // Appending it as ?v= makes the URL unique so the browser never
  // finds it in its cache, providing same-tab freshness.
  getPublicImageUrl(path?: string | null, version?: number): string | null {
    if (!path) return null;
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path);
    return version !== undefined
      ? `${data.publicUrl}?v=${version}`
      : data.publicUrl;
  }
}

export const storageService = new StorageService();
