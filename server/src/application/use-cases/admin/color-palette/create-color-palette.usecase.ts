import { ConflictError } from "../../../../domain/errors/conflict.error.ts";
import type { IColorPaletteRepository } from "../../../../domain/repositories/i-color-palette.repository.ts";
import { ColorPalette } from "../../../../domain/entities/color-palette.entity.ts";
import type { ICreateColorPaletteUseCase } from "../../../interfaces/repositories/admin/color-palette/i-create-color-palette.usecase.ts";
import type {
  ColorPaletteResponseDto,
  CreateColorPaletteDto,
} from "../../../dto/color-palette.dto.ts";
import { DatabaseError } from "../../../../domain/errors/database.error.ts";

export class CreateColorPaletteUseCase implements ICreateColorPaletteUseCase {
  constructor(
    private readonly _colorPaletteRepository: IColorPaletteRepository,
  ) {}

  async execute(data: CreateColorPaletteDto): Promise<ColorPaletteResponseDto> {
    const { colors, name } = data;

    const exists = await this._colorPaletteRepository.existsByPaletteName(
      name.trim(),
    );

    if (exists) {
      throw new ConflictError("Color palette name already exists");
    }

    const palette = ColorPalette.createActive({
      id: null,
      name: name.trim(),
      colors: { ...colors },
      createdAt: null,
      updatedAt: null,
    });

    const savedColorPalette = await this._colorPaletteRepository.save(palette);

    if (!savedColorPalette) {
      throw new DatabaseError("Error while saving the Color palette");
    }

    const { activate, createdAt, deactivate, updateDetails, ...rest } = palette;

    return rest;
  }
}
