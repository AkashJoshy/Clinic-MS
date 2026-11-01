import { InternalServerError } from "../../../../domain/errors/internal-server.error.ts";
import type { ITokenService } from "../../../../domain/services/i-token.service.ts";
import type {
  AccessPayloadDto,
  AccessTokenPayloadDto,
  TokenResponseDto,
} from "../../../dto/auth.dto.ts";
import type { IAccessTokenGenerationService } from "../../../interfaces/services/shared/token/i-access-token-generation.service.ts";

export class AccessTokenGenerationService implements IAccessTokenGenerationService {
  constructor(private _tokenService: ITokenService) {}

  async generate(user: AccessPayloadDto): Promise<TokenResponseDto> {
    const payload: AccessTokenPayloadDto = {
      userId: user.id!,
      role: user.role,
      tokenType: "access",
    };

    const accessToken = this._tokenService.generateAccessToken(payload);

    if (!accessToken) {
      throw new InternalServerError(
        "An internal error occurred. Please try again later.",
      );
    }

    return accessToken;
  }
}
