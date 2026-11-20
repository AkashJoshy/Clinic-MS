import type {
  ColorPaletteResponseDto,
  EditColorPaletteDto,
} from "../../../../dto/color-palette.dto.ts";

export interface IEditColorPaletteUseCase {
  execute(data: EditColorPaletteDto): Promise<ColorPaletteResponseDto>;
}
