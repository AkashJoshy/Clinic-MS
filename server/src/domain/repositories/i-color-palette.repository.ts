import type { ColorPalette } from "../entities/color-palette.entity.ts";
import type { IBaseRepository } from "./i-base.repository.ts";

export interface IColorPaletteRepository extends IBaseRepository<ColorPalette> {
  findAll(): Promise<ColorPalette[]>
  findActivePalettes(): Promise<ColorPalette[]>;
  existsByPaletteName(name: string): Promise<boolean>;
}
