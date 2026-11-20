import type { ColorPaletteResponseDto } from "../../../../dto/color-palette.dto.ts";

export interface IGetAllColorPaletteUseCase {
  execute(): Promise<ColorPaletteResponseDto[]>;
}
