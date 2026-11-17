import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IPlatformSettingsRepository } from "../../../../domain/repositories/i-platform-settings.repository.ts";
import type {
  UpdatePlatformSettingsDto,
  UpdatePlatformSettingsResponseDto,
} from "../../../dto/admin.dto.ts";
import type { IUpdatePlatformSettingsUseCase } from "../../../interfaces/repositories/admin/platform-settings/i-update-platform-settings.use-case.ts";
import { PlatformSettingsMapper } from "../../../mappers/admin/platform-settings.mapper.ts";

export class UpdatePlatformSettingsUseCase implements IUpdatePlatformSettingsUseCase {
  constructor(
    private readonly platformSettingsRepository: IPlatformSettingsRepository,
  ) {}

  async execute(
    input: UpdatePlatformSettingsDto,
    updatedBy?: string,
  ): Promise<UpdatePlatformSettingsResponseDto> {
    const { selection, data } = input;

    const settings = await this.platformSettingsRepository.findSettings();

    if (!settings || !settings.id) {
      throw new NotFoundError("Platform settings");
    }

    if (selection === "GENERAL") {
      settings.updateGeneral(data);
    } else if (selection === "BUSINESS") {
      settings.updateBusiness(data);
    } else if (selection === "SYSTEM") {
      settings.updateSystem(data);
    } else {
      throw new NotFoundError("Section");
    }

    const fieldMap = {
      GENERAL: "general",
      BUSINESS: "business",
      SYSTEM: "system",
    } as const;

    const field = fieldMap[selection];

    const updateData = {
      [field]: settings[field],
    };

    const updatedSettings =
      await this.platformSettingsRepository.updateSettings(
        updateData,
        updatedBy,
      );

    if (!updatedSettings) {
      throw new Error("Platform settings not found.");
    }

    return PlatformSettingsMapper.toUpdateResponse(updatedSettings, selection);
  }
}
