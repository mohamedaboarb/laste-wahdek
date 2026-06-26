import { createClient } from "@/lib/supabase/client";

const BUCKET_NAME = "images";

const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 1 MB

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
] as const;

export type ImageFolder = "images" | "certificates";
const supabase = createClient();

class StorageService {
  /**
   * Validate selected image
   */
  private validateImage(file: File) {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type as any)) {
      throw new Error("Only JPG, JPEG, PNG and WEBP images are allowed.");
    }

    if (file.size > MAX_IMAGE_SIZE) {
      throw new Error("Image size must be less than 1 MB.");
    }
  }

  //   generate image path

  generateImagePath(folder: ImageFolder, id: string, file: File) {
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";

    return `${folder}/${id}/avatar.${extension}`;
  }

  //  upload the image to supabase
  async uploadImage({
    folder,
    id,
    file,
    oldPath,
  }: {
    folder: ImageFolder;
    id: string;
    file: File;
    oldPath?: string | null;
  }) {
    this.validateImage(file);

    const imagePath = this.generateImagePath(folder, id, file);

    if (oldPath) {
      await this.deleteImage(oldPath).catch(() => {});
    }

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(imagePath, file, {
        upsert: true,
        cacheControl: "3600",
      });

    if (error) {
      throw new Error(error.message);
    }

    return imagePath;
  }

  //   delete image
  async deleteImage(path: string) {
    const supabase = await createClient();

    const { error } = await supabase.storage.from(BUCKET_NAME).remove([path]);

    if (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Get public URL from stored image path
   */
  getPublicImageUrl(path?: string | null) {
    if (!path) return null;
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path);

    return data.publicUrl;
  }
}

export const storageService = new StorageService();
