import { NotFoundError } from "../../../domain/errors/not-found.error.ts";
import type { IPlatformSettingsRepository } from "../../../domain/repositories/i-platform-settings.repository.ts";
import type { PlatformDataResponseDto } from "../../dto/shared.dto.ts";
import type { IGetPlatformDataUseCase } from "../../interfaces/repositories/shared/i-get-platform-data.usecase.ts";

export class GetPlatformDataUseCase implements IGetPlatformDataUseCase {
  constructor(
    private readonly _platformSettingsRepository: IPlatformSettingsRepository,
  ) {}

  async execute(): Promise<PlatformDataResponseDto> {
    const settings = await this._platformSettingsRepository.findSettings();

    if (!settings) {
      throw new NotFoundError("Platform settings");
    }
    
    return {
      platformName: settings.general.platform.platformName,
      primaryColor: settings.general.appearance.primaryBrandColor,
      isMaintenanceMode: settings.general.security.maintenanceMode,
    };
  }
}
