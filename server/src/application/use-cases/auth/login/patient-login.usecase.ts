import { InvalidCredentialsError } from "../../../../domain/errors/invalid-credentials.error.ts";
import type { Role } from "../../../../domain/types/user.types.ts";
import type {
  AccessPayloadDto,
  LoginDTO,
  LoginResponseDTO,
  LoginVerificationResponseDTO,
  RefreshPayloadDto,
} from "../../../dto/auth.dto.ts";
import type { IEmailVerificationService } from "../../../IService/i-email-verification.service.ts";
import type { IAccessTokenGenerationService } from "../../../IService/i-access-token-generation.service.ts";
import type { IUserExistenceService } from "../../../IService/i-user-existence.service.ts";
import type { ILoginUseCase } from "../../../repositories/auth/i-login.usecase.ts";
import type { IRefreshTokenGenerationService } from "../../../IService/i-refresh-token-generation.service.ts";

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
      const token = await this._mailVerficationService.execute(
        user.email,
        user.fullName,
        user.role as Role,
      );

      return {
        token,
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
