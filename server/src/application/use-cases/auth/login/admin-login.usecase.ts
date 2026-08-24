import type {
  LoginResponseDTO,
  LoginDTO,
  AccessPayloadDto,
  RefreshPayloadDto,
} from "../../../dto/auth.dto.ts";
import type { ILoginUseCase } from "../../../repositories/auth/ILoginUseCase.ts";
import type { IUserExistenceService } from "../../../IService/IUserExistenceService.ts";
import type { IAccessTokenGenerationService } from "../../../IService/IAccessTokenGenerationService.ts";
import type { IRefreshTokenGenerationService } from "../../../IService/IRefreshTokenGenerationService.ts";

export class AdminLoginUseCase implements ILoginUseCase {
  constructor(
    private _userExistenceService: IUserExistenceService,
    private _accesstokenGenerationService: IAccessTokenGenerationService,
    private _refreshtokenGenerationService: IRefreshTokenGenerationService,
  ) {}

  async execute(data: LoginDTO): Promise<LoginResponseDTO> {
    const user = await this._userExistenceService.execute(data);

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
      user,
      tokenPair,
      role,
    };
  }
}
