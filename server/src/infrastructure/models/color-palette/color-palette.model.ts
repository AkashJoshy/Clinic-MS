import { model } from "mongoose";
import type { IColorPalette } from "./color-palette.types.ts";
import { ColorPaletteSchema } from "./color-palette.schema.ts";
import { MODEL_NAMES } from "../model-names.ts";

export const ColorPaletteModel = model<IColorPalette>(
  MODEL_NAMES.COLOR_PALETTE,
  ColorPaletteSchema,
);
