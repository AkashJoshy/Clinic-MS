import type { ColorPaletteResponseDto } from "../../../../dto/color-palette.dto.ts";

export interface IGetColorPaletteUseCase {
  execute(id: string): Promise<ColorPaletteResponseDto>;
}
