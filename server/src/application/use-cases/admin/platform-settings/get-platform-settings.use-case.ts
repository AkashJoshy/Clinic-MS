import type { IPlatformSettingsRepository } from "../../../../domain/repositories/i-platform-settings.repository.ts";
import type {
  PlatformSettingsResponseDto,
} from "../../../dto/admin.dto.ts";
import type { IGetPlatformSettingsUseCase } from "../../../interfaces/repositories/admin/platform-settings/i-get-platform-settings.use-case.ts";

export class GetPlatformSettingsUseCase implements IGetPlatformSettingsUseCase {
  constructor(
    private readonly platformSettingsRepository: IPlatformSettingsRepository,
  ) {}

  async execute(): Promise<PlatformSettingsResponseDto> {
    const settings = await this.platformSettingsRepository.findSettings();

    if (!settings) {
      throw new Error("Platform settings not found.");
    }

    const { updatedBy, createdBy, createdAt, updatedAt, ...rest } = settings;

    return rest;
  }
}
