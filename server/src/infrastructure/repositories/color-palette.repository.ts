import { Schema, Types } from "mongoose";
import { ColorPalette } from "../../domain/entities/color-palette.entity.ts";
import type { IColorPaletteRepository } from "../../domain/repositories/i-color-palette.repository.ts";
import { ColorPaletteModel } from "../models/color-palette/color-palette.model.ts";
import type { IColorPalette } from "../models/color-palette/color-palette.types.ts";
import { BaseRepository } from "./base/base.repository.ts";

export class ColorPaletteRepository
  extends BaseRepository<ColorPalette, IColorPalette>
  implements IColorPaletteRepository
{
  constructor() {
    super(ColorPaletteModel);
  }

  protected toDomain(doc: IColorPalette): ColorPalette {
    return ColorPalette.create({
      id: doc._id.toString(),
      name: doc.name,
      colors: doc.colors,
      isActive: doc.isActive,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  protected toPersistence(entity: ColorPalette): Partial<IColorPalette> {
    return {
      _id: new Types.ObjectId(entity.id!),
      name: entity.name,
      colors: { ...entity.colors },
      isActive: entity.isActive,
      createdAt: entity.createdAt ?? null,
      updatedAt: entity.updatedAt ?? null,
    };
  }

  async findAll(): Promise<ColorPalette[]> {
    const docs = await ColorPaletteModel.find().lean()

    return docs.map((doc) => this.toDomain(doc));
  }

  async findActivePalettes(): Promise<ColorPalette[]> {
    const docs = await ColorPaletteModel.find({ isActive: true }).lean()

    return docs.map((doc) => this.toDomain(doc));
  }

  async existsByPaletteName(name: string): Promise<boolean> {
    const exists = await ColorPaletteModel.exists({ name }).lean()

    return exists !== null;
  }
}
