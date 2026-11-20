import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IColorPaletteRepository } from "../../../../domain/repositories/i-color-palette.repository.ts";
import type { IToggleColorPaletteStatusUseCase } from "../../../interfaces/repositories/admin/color-palette/i-toggle-color-palette-status.usecase.ts";
import type { ColorPaletteResponseDto } from "../../../dto/color-palette.dto.ts";
import { DatabaseError } from "../../../../domain/errors/database.error.ts";

export class ToggleColorPaletteStatusUseCase implements IToggleColorPaletteStatusUseCase {
  constructor(
    private readonly _colorPaletteRepository: IColorPaletteRepository,
  ) {}

  async execute(id: string): Promise<ColorPaletteResponseDto> {
    const palette = await this._colorPaletteRepository.findById(id);

    console.log(`Id`, id)

    if (!palette || !palette.id) {
      throw new NotFoundError("Color palette");
    }

    if (palette.isActive) {
      palette.deactivate();
    } else {
      palette.activate();
    }

    const updatedColorPalette =
      await this._colorPaletteRepository.findByIdAndUpdate(id, {
        isActive: palette.isActive,
      });

    if (!updatedColorPalette) {
      throw new DatabaseError("Error while updating the status");
    }

    const { activate, createdAt, deactivate, updateDetails, ...rest } = palette;

    return rest;
  }
}
