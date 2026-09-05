import { InternalServerError } from "../../domain/errors/internal-server.error.ts";
import type { ITokenService } from "../../domain/services/token.service.ts";
import type {
  AccessPayloadDto,
  AccessTokenPayloadDto,
} from "../dto/auth.dto.ts";

export class AccessTokenGenerationService {
  constructor(private _tokenService: ITokenService) {}
  async generate(user: AccessPayloadDto): Promise<string | void> {
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
