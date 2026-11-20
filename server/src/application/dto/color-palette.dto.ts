import type {
  PaletteColors,
  SafeColorPalette,
} from "../../domain/types/color-palette.types.ts";

export interface CreateColorPaletteDto {
  name: string;
  colors: PaletteColors;
}

export interface EditColorPaletteDto {
  id: string;
  data: {
    name?: string;
    colors?: PaletteColors;
  };
}

export type ColorPaletteResponseDto = SafeColorPalette



