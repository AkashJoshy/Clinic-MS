import { InvalidCredentialsError } from "../../../../domain/errors/invalid-credentials.error.ts";
import type { Role } from "../../../../domain/types/user.types.ts";
import type {
  AccessPayloadDto,
  LoginDTO,
  LoginResponseDTO,
  RefreshPayloadDto,
} from "../../../dto/auth.dto.ts";
import type { IEmailVerificationService } from "../../../IService/IEmailVerificationService.ts";
import type { IAccessTokenGenerationService } from "../../../IService/IAccessTokenGenerationService.ts";
import type { IUserExistenceService } from "../../../IService/IUserExistenceService.ts";
import type { ILoginUseCase } from "../../../repositories/auth/ILoginUseCase.ts";
import type { IRefreshTokenGenerationService } from "../../../IService/IRefreshTokenGenerationService.ts";

export class PatientLoginUseCase implements ILoginUseCase {
  constructor(
    private _userExistenceService: IUserExistenceService,
    private _accesstokenGenerationService: IAccessTokenGenerationService,
    private _refreshtokenGenerationService: IRefreshTokenGenerationService,
    private readonly _mailVerficationService: IEmailVerificationService,
  ) {}

  async execute(data: LoginDTO): Promise<LoginResponseDTO> {
    const user = await this._userExistenceService.execute(data);

    if (!user.isEmailVerified) {
      await this._mailVerficationService.execute(
        user.email,
        user.fullName,
        user.role as Role,
      );
      throw new InvalidCredentialsError(
        "A verification email has been sent. Please check your inbox and verify your account.",
      );
    }

    const { password, ...updatedUser } = user;

    const accessPayload: AccessPayloadDto = {
      id: updatedUser.id!,
      role: updatedUser.role,
    };

    
    const refreshPayload: RefreshPayloadDto = {
      id: updatedUser.id!,
      tokenId: ''
    };

    const accessToken =
      await this._accesstokenGenerationService.generate(accessPayload);

    const refreshToken =
      await this._refreshtokenGenerationService.generate(refreshPayload);

    const tokenPair = {
      access: accessToken!,
      refresh: refreshToken!
    }

    let role = user.role.toLowerCase();

    return {
      user: updatedUser,
      tokenPair,
      role,
    }

  }
}
