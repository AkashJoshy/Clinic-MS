import { ConflictError } from "../../../../domain/errors/conflict.error.ts";
import { DatabaseError } from "../../../../domain/errors/database.error.ts";
import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IColorPaletteRepository } from "../../../../domain/repositories/i-color-palette.repository.ts";
import type {
  ColorPaletteResponseDto,
  EditColorPaletteDto,
} from "../../../dto/color-palette.dto.ts";
import type { IEditColorPaletteUseCase } from "../../../interfaces/repositories/admin/color-palette/i-edit-color-palette.usecase.ts";

export class EditColorPaletteUseCase implements IEditColorPaletteUseCase {
  constructor(
    private readonly _colorPaletteRepository: IColorPaletteRepository,
  ) {}

  async execute(data: EditColorPaletteDto): Promise<ColorPaletteResponseDto> {
    const { id, ...rest } = data;

    console.log(`PaletteId`)
    console.log(id)
    const palette = await this._colorPaletteRepository.findById(id);

    if (!palette || !palette.id) {
      throw new NotFoundError("Color palette");
    }

    console.log(`Color Palette in EDIT`);
    console.log(palette);
    

    if (
      rest.data.name !== undefined &&
      rest.data.name.trim() !== palette.name
    ) {
      const exists = await this._colorPaletteRepository.existsByPaletteName(
        rest.data.name.trim(),
      );

      if (exists) {
        throw new ConflictError("Color palette name already exists");
      }
    }

    palette.updateDetails({
      colors: rest.data.colors!,
      name: rest.data.name!,
    });

    const updatedPalette = await this._colorPaletteRepository.findByIdAndUpdate(
      palette.id,
      palette,
    );

    if (!updatedPalette || updatedPalette === null) {
      throw new DatabaseError("Error");
    }

    const {
      createdAt,
      activate,
      deactivate,
      updateDetails,
      ...restUpdatedPalette
    } = updatedPalette;

    return restUpdatedPalette;
  }
}
