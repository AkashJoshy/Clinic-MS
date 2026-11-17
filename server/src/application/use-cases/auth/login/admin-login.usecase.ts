import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IPlatformSettingsRepository } from "../../../../domain/repositories/i-platform-settings.repository.ts";
import type {
  LoginResponseDTO,
  LoginDTO,
  AccessPayloadDto,
  RefreshPayloadDto,
  LoginVerificationResponseDTO,
} from "../../../dto/auth.dto.ts";
import type { ILoginUseCase } from "../../../interfaces/repositories/auth/i-login.usecase.ts";
import type { IAccessTokenGenerationService } from "../../../interfaces/services/shared/token/i-access-token-generation.service.ts";
import type { IRefreshTokenGenerationService } from "../../../interfaces/services/shared/token/i-refresh-token-generation.service.ts";
import type { IUserExistenceService } from "../../../interfaces/services/shared/user/i-user-existence.service.ts";

export class AdminLoginUseCase implements ILoginUseCase {
  constructor(
    private _userExistenceService: IUserExistenceService,
    private _accesstokenGenerationService: IAccessTokenGenerationService,
    private _refreshtokenGenerationService: IRefreshTokenGenerationService,
    private _platformSettingsRepository: IPlatformSettingsRepository,
  ) {}

  async execute(
    data: LoginDTO,
  ): Promise<LoginResponseDTO | LoginVerificationResponseDTO> {
    const user = await this._userExistenceService.execute(data);

    const platformSettings =
      await this._platformSettingsRepository.findSettings();

    if (!platformSettings || !platformSettings.id) {
      throw new NotFoundError("Platform Settings");
    }

    const {
      general: {
        appearance: { mode },
      },
    } = platformSettings;

    const { password, ...updatedUser } = user;

    const accessPayload: AccessPayloadDto = {
      id: updatedUser.id!,
      role: updatedUser.role,
    };

    const refreshPayload: RefreshPayloadDto = {
      id: updatedUser.id!,
      tokenId: "",
    };

    const accessToken =
      await this._accesstokenGenerationService.generate(accessPayload);

    const refreshToken =
      await this._refreshtokenGenerationService.generate(refreshPayload);

    const tokenPair = {
      access: accessToken!,
      refresh: refreshToken!,
    };

    let role = user.role.toLowerCase();
    return {
      user: { ...updatedUser, theme: mode },
      tokenPair,
      role,
    };
  }
}
