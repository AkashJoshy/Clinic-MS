import type { IColorPaletteRepository } from "../../../../domain/repositories/i-color-palette.repository.ts";
import type { ColorPaletteResponseDto } from "../../../dto/color-palette.dto.ts";
import type { IGetAllColorPaletteUseCase } from "../../../interfaces/repositories/admin/color-palette/i-get-all-color-palette.usecase.ts";

export class GetAllColorPaletteUseCase implements IGetAllColorPaletteUseCase {
  constructor(
    private readonly _colorPaletteRepository: IColorPaletteRepository,
  ) {}

  async execute(): Promise<ColorPaletteResponseDto[]> {

    const palettes = await this._colorPaletteRepository.findAll();

    const updatedPalettes = palettes.map((palette) => {
      const { activate, createdAt, deactivate, updateDetails, ...rest } =
        palette;

      return rest;
    });

    return updatedPalettes;
  }
}
