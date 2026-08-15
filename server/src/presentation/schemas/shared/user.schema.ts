import * as z from "zod";
import { UPDATE_METHODS } from "../../../domain/constants/shared.constants.ts";
import { FILE_SIZE_2MB } from "../../../domain/constants/user.constants.ts";

export const updateUserSchema = z.object({
  method: z.enum(UPDATE_METHODS, {
    message: "Invalid user action"
  }),
});


const ALLOWED_IMG_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
export const updatePersonalProfilePictureSchema = z
  .custom<Express.Multer.File>()
  .refine((file) => file !== undefined, {
    message: "Profile picture is required",
  })
  .refine(
    (file) =>
      ALLOWED_IMG_TYPES.includes(
        file.mimetype as (typeof ALLOWED_IMG_TYPES)[number],
      ),
    {
      message: "Only JPG, PNG and WEBP images are allowed",
    },
  )
  .refine((file) => file.size <= FILE_SIZE_2MB, {
    message: "Image size must be less than 2MB",
  });