import type { Types, HydratedDocument, Document } from "mongoose";
import type { PaletteColors } from "../../../domain/types/color-palette.types.ts";

export interface IPersistenceColorPalette extends Document {
  _id: Types.ObjectId;
  name: string;
  colors: PaletteColors;
  isActive: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export type IColorPalette = IPersistenceColorPalette
