import { z } from "zod";
import { paletteColorsSchema } from "../base.schema";

export const colorPaletteSchema = z
  .object({
    id: z.string().optional().nullable(),
    name: z
      .string()
      .trim()
      .min(1, "Please enter a palette name.")
      .max(40, "Palette name cannot exceed 40 characters."),
    colors: paletteColorsSchema,
    isActive: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.id === null) return;
  });

