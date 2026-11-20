import type { ColorPaletteResponseDto, CreateColorPaletteDto } from "../../../../dto/color-palette.dto.ts";

export interface ICreateColorPaletteUseCase {
  execute(data: CreateColorPaletteDto): Promise<ColorPaletteResponseDto>;
}

