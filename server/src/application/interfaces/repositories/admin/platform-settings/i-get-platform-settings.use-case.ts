import type { PlatformSettingsResponseDto } from "../../../../dto/admin.dto.ts";

export interface IGetPlatformSettingsUseCase {
  execute(): Promise<PlatformSettingsResponseDto>;
}
