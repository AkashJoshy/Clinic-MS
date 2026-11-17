import { Types } from "mongoose";
import { PlatformSettings } from "../../domain/entities/platform-settings.entity.ts";
import type { BasePlatformSettingsProps } from "../../domain/types/platform-settings.types.ts";
import type { IPlatformSettingsRepository } from "../../domain/repositories/i-platform-settings.repository.ts";
import { PlatformSettingsModel } from "../models/platform-settings/platform-settings.model.ts";
import { BaseRepository } from "./base/base.repository.ts";
import type { IPlatformSettings } from "../models/platform-settings/platform-settings.types.ts";

export class PlatformSettingsRepository
  extends BaseRepository<PlatformSettings, IPlatformSettings>
  implements IPlatformSettingsRepository
{
  constructor() {
    super(PlatformSettingsModel);
  }

  protected toDomain(doc: IPlatformSettings): PlatformSettings {
    return PlatformSettings.create({
      id: doc._id.toString(),

      general: doc.general,
      business: doc.business,
      system: doc.system,

      settingsVersion: doc.settingsVersion,

      createdBy: doc.createdBy?.toString() ?? null,
      updatedBy: doc.updatedBy?.toString() ?? null,

      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  protected toPersistence(
    entity: PlatformSettings,
  ): Partial<IPlatformSettings> {
    return {
      type: entity.type,

      general: entity.general,
      business: entity.business,
      system: entity.system,

      settingsVersion: entity.settingsVersion,

      createdBy: entity.createdBy ? new Types.ObjectId(entity.createdBy) : null,

      updatedBy: entity.updatedBy ? new Types.ObjectId(entity.updatedBy) : null,
    };
  }

  async findSettings(): Promise<PlatformSettings | null> {
    const doc = await PlatformSettingsModel.findOne({
      type: "PLATFORM",
    });

    if (!doc) return null;

    return this.toDomain(doc);
  }

  async createSettings(entity: PlatformSettings): Promise<PlatformSettings> {
    const doc = await PlatformSettingsModel.create(this.toPersistence(entity));

    return this.toDomain(doc);
  }

  async updateSettings(
    data: BasePlatformSettingsProps,
    updatedBy?: string,
  ): Promise<PlatformSettings | null> {
    const doc = await PlatformSettingsModel.findOne({
      type: "PLATFORM",
    });

    if (!doc) return null;

    const entity = this.toDomain(doc);
    entity.settingsVersion += 1;

    if (updatedBy) {
      entity.updatedBy = updatedBy;
    }

    const updatedDoc = await PlatformSettingsModel.findOneAndUpdate(
      { type: "PLATFORM" },
      {
        $set: { ...data, updatedBy: updatedBy },
        $inc: { settingsVersion: 1 },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedDoc) return null;

    return this.toDomain(updatedDoc);
  }
}
