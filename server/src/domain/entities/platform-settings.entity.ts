import type {
  BasePlatformSettingsProps,
  PlatformSettingsProps,
} from "../types/platform-settings.types.ts";

export class PlatformSettings {
  public readonly type = "PLATFORM" as const;

  constructor(
    public id: string | null,
    public general: PlatformSettingsProps["general"],
    public business: PlatformSettingsProps["business"],
    public system: PlatformSettingsProps["system"],
    public settingsVersion: number,
    public createdBy: string | null,
    public updatedBy: string | null,
    public createdAt: Date | null,
    public updatedAt: Date | null,
  ) {}

  static create(data: Partial<PlatformSettingsProps>): PlatformSettings {
    if (!data.general || !data.business || !data.system) {
      throw new Error("General, business, and system settings are required.");
    }

    return new PlatformSettings(
      data.id ?? null,
      data.general,
      data.business,
      data.system,
      data.settingsVersion ?? 1,
      data.createdBy ?? null,
      data.updatedBy ?? null,
      data.createdAt ?? null,
      data.updatedAt ?? null,
    );
  }

  updateGeneral(data: PlatformSettingsProps["general"]): void {
    this.general = data;
  }

  updateBusiness(data: PlatformSettingsProps["business"]): void {
    this.business = data;
  }

  updateSystem(data: PlatformSettingsProps["system"]): void {
    this.system = data;
  }
}
