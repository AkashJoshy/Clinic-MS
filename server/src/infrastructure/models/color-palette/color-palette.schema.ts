import { Schema } from "mongoose";
import type { IColorPalette } from "./color-palette.types.ts";
import type { PaletteColors } from "../../../domain/types/color-palette.types.ts";

const PaletteColorsSchema = new Schema<PaletteColors>(
  {
    AVAILABLE: {
      type: String,
      required: true,
    },
    REPLACEABLE: {
      type: String,
      required: true,
    },
    BOOKED: {
      type: String,
      required: true,
    },
    APPROVED: {
      type: String,
      required: true,
    },
    CANCELLED: {
      type: String,
      required: true,
    },
    EXPIRED: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
    versionKey: false,
  },
);

export const ColorPaletteSchema = new Schema<IColorPalette>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    colors: {
      type: PaletteColorsSchema,
      required: true,
    },

    isActive: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
