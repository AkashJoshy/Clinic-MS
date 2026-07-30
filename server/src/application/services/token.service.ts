import { InternalServerError } from "../../domain/errors/internal-server.error.ts";
import type { ITokenService } from "../../domain/services/TokenService.ts";
import type { PayloadDTO, UserDto } from "../dto/auth.dto.ts";

export class TokenGenerationService {
  constructor(private _tokenService: ITokenService) {}
  async generate(user: UserDto): Promise<string | void> {
    const payload = {
      userId: user.id!,
      role: user.role,
    };

    const accessToken = this._tokenService.generateToken(payload);

    if (!accessToken) {
      throw new InternalServerError(
        "An internal error occurred. Please try again later.",
      );
    }

    return accessToken;
  }
}
