import type { ColorPaletteResponseDto } from "../../../../dto/color-palette.dto.ts";

export interface IToggleColorPaletteStatusUseCase {
  execute(id: string): Promise<ColorPaletteResponseDto>;
}
