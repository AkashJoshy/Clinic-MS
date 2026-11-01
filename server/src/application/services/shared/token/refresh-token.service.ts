import RefreshSession from "../../../../domain/entities/refresh-session.entity.ts";
import { InternalServerError } from "../../../../domain/errors/internal-server.error.ts";
import type { IRefreshSessionRepository } from "../../../../domain/repositories/i-refresh-session.repository.ts";
import type { IHashService } from "../../../../domain/services/i-hash.service.ts";
import type { ITokenService } from "../../../../domain/services/i-token.service.ts";
import type {
  RefreshPayloadDto,
  RefreshTokenPayloadDto,
  TokenResponseDto,
} from "../../../dto/auth.dto.ts";
import type { IRefreshTokenGenerationService } from "../../../interfaces/services/shared/token/i-refresh-token-generation.service.ts";

export class RefreshTokenGenerationService implements IRefreshTokenGenerationService {
  constructor(
    private _tokenService: ITokenService,
    private _refreshSession: IRefreshSessionRepository,
    private readonly _hashService: IHashService,
  ) {}

  async generate(user: RefreshPayloadDto): Promise<TokenResponseDto> {
    const tokenId = crypto.randomUUID();
    const payload: RefreshTokenPayloadDto = {
      userId: user.id!,
      tokenId,
      tokenType: "refresh",
    };

    const refreshToken = this._tokenService.generateRefreshToken(payload);

    if (!refreshToken) {
      throw new InternalServerError(
        "An internal error occurred. Please try again later.",
      );
    }

    const hashedTokenId = await this._hashService.hash(
      payload.tokenId,
      "Token",
    );

    if (!hashedTokenId) {
      throw new InternalServerError(
        "An internal error occurred. Please try again later.",
      );
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this._refreshSession.save(
      RefreshSession.create({
        userId: payload.userId,
        tokenId: hashedTokenId,
        expiresAt,
      }),
    );

    return refreshToken;
  }
}
