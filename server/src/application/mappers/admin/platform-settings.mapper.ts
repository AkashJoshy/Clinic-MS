import type { PlatformSettings } from "../../../domain/entities/platform-settings.entity.ts";
import type {
  UpdatePlatformSettingsDto,
  UpdatePlatformSettingsResponseDto,
} from "../../dto/admin.dto.ts";

export class PlatformSettingsMapper {
  static toUpdateResponse(
    settings: PlatformSettings,
    selection: UpdatePlatformSettingsDto["selection"],
  ): UpdatePlatformSettingsResponseDto {
    switch (selection) {
      case "GENERAL":
        return {
          selection: "GENERAL",
          data: settings.general,
        };

      case "BUSINESS":
        return {
          selection: "BUSINESS",
          data: settings.business,
        };

      case "SYSTEM":
        return {
          selection: "SYSTEM",
          data: settings.system,
        };
    }
  }
}
