import type {
  UpdatePlatformSettingsDto,
  UpdatePlatformSettingsResponseDto,
} from "../../../../dto/admin.dto.ts";

export interface IUpdatePlatformSettingsUseCase {
  execute(
    data: UpdatePlatformSettingsDto,
    updatedBy?: string,
  ): Promise<UpdatePlatformSettingsResponseDto>;
}
