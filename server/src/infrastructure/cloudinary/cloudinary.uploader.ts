import type { UploadApiResponse } from "cloudinary";
import cloudinary from "./cloudinary.config.ts";

type ResourceType = "image" | "video" | "raw" | "auto";

export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
}

export const uploadToCloudinary = (
  buffer: Buffer,
  folder: string,
  resourceType: ResourceType = "image",
): Promise<CloudinaryUploadResult> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType },
      (error, result: UploadApiResponse | undefined) => {
        if (error || !result)
          return reject(error ?? new Error("Upload failed"));
        resolve({ url: result.secure_url, publicId: result.public_id });
      },
    );
    stream.end(buffer);
  });
};

export const deleteFromCloudinary = async (
  publicId: string,
  resourceType: ResourceType = "image",
): Promise<boolean> => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    })
    return result.result === "ok";
  } catch (error) {
    throw error instanceof Error ? error : new Error("Delete failed");
  }
};
