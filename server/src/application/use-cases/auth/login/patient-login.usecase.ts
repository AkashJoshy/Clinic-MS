import type { Role } from "../../../../domain/types/user.types.ts";
import type {
  AccessPayloadDto,
  LoginDTO,
  LoginResponseDTO,
  LoginVerificationResponseDTO,
  RefreshPayloadDto,
} from "../../../dto/auth.dto.ts";
import type { IEmailVerificationService } from "../../../interfaces/services/shared/user/i-email-verification.service.ts";
import type { IAccessTokenGenerationService } from "../../../interfaces/services/shared/token/i-access-token-generation.service.ts";
import type { ILoginUseCase } from "../../../interfaces/repositories/auth/i-login.usecase.ts";
import type { IRefreshTokenGenerationService } from "../../../interfaces/services/shared/token/i-refresh-token-generation.service.ts";
import type { IUserExistenceService } from "../../../interfaces/services/shared/user/i-user-existence.service.ts";

export class PatientLoginUseCase implements ILoginUseCase {
  constructor(
    private _userExistenceService: IUserExistenceService,
    private _accesstokenGenerationService: IAccessTokenGenerationService,
    private _refreshtokenGenerationService: IRefreshTokenGenerationService,
    private readonly _mailVerficationService: IEmailVerificationService,
  ) {}

  async execute(
    data: LoginDTO,
  ): Promise<LoginResponseDTO | LoginVerificationResponseDTO> {
    const user = await this._userExistenceService.execute(data);

    if (!user.isEmailVerified) {
      const token = await this._mailVerficationService.execute({
        email: user.email,
        name: user.fullName,
        role: user.role as Role,
      });

      return {
        token,
        email: user.email,
        role: user.role,
      };
    }

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
      user: updatedUser,
      tokenPair,
      role,
    };
  }
}
