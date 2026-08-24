import type { IUserRepository } from "../../../../domain/repositories/IUserRepository.ts";
import type {
  AccessPayloadDto,
  GoogleLoginDTO,
  LoginResponseDTO,
  RefreshPayloadDto,
  TokenPair,
} from "../../../dto/auth.dto.ts";
import type { IAccessTokenGenerationService } from "../../../IService/IAccessTokenGenerationService.ts";
import type { IRefreshTokenGenerationService } from "../../../IService/IRefreshTokenGenerationService.ts";
import type { IPatientGoogleAuthUseCase } from "../../../repositories/auth/IPatientGoogleAuthUsecase.ts";

export class PatientGoogleLoginUseCase implements IPatientGoogleAuthUseCase {
  constructor(
    private _accessGenerationService: IAccessTokenGenerationService,
    private _refreshGenerationService: IRefreshTokenGenerationService,
    private _userRepository: IUserRepository,
  ) {}

  async execute(user: GoogleLoginDTO): Promise<LoginResponseDTO> {
    const isUserExisted = await this._userRepository.findByEmail(user.email);

    const tokenPair: TokenPair = {
      access: "",
      refresh: ""
    }

    if (!isUserExisted) {
      return {
        user: null,
        tokenPair,
        role: "patient",
        message: "Account not found. Redirecting to signup...",
      };
    }

    const accessPayload: AccessPayloadDto = {
      id: isUserExisted.id,
      role: isUserExisted.role
    }
    const refreshPayload: RefreshPayloadDto = {
      id: isUserExisted.id,
      tokenId: ""
    }

    const accessToken =
      await this._accessGenerationService.generate(accessPayload)
      
      const refreshToken = 
      await this._refreshGenerationService.generate(refreshPayload)

      tokenPair.access = accessToken!
      tokenPair.refresh = refreshToken!

    const { password, ...updatedUser } = isUserExisted;

    return {
      user: updatedUser,
      tokenPair,
      role: "patient",
    };
  }
}
