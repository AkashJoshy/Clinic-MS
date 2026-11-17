import type { PlatformSettings } from "../entities/platform-settings.entity.ts";
import type { BasePlatformSettingsProps } from "../types/platform-settings.types.ts";

export interface IPlatformSettingsRepository {
  findSettings(): Promise<PlatformSettings | null>;

  createSettings(entity: PlatformSettings): Promise<PlatformSettings>;

  updateSettings(
    data: BasePlatformSettingsProps,
    updatedBy?: string,
  ): Promise<PlatformSettings | null>;
}
