import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IColorPaletteRepository } from "../../../../domain/repositories/i-color-palette.repository.ts";
import type {
  ColorPaletteResponseDto,
} from "../../../dto/color-palette.dto.ts";
import type { IGetColorPaletteUseCase } from "../../../interfaces/repositories/admin/color-palette/i-get-color-palette.usecase.ts";

export class GetColorPaletteUseCase implements IGetColorPaletteUseCase {
  constructor(
    private readonly _colorPaletteRepository: IColorPaletteRepository,
  ) {}

  async execute(id: string): Promise<ColorPaletteResponseDto> {

    const palette = await this._colorPaletteRepository.findById(id);

    if (!palette) {
      throw new NotFoundError("Color palette");
    }

    return palette;
  }
}
