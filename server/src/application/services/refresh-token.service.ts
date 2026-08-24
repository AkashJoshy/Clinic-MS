import RefreshSession from "../../domain/entities/RefreshSession.ts";
import { InternalServerError } from "../../domain/errors/internal-server.error.ts";
import type { IRefreshSessionRepository } from "../../domain/repositories/IRefreshSessionRepository.ts";
import type { IHashService } from "../../domain/services/hashService.ts";
import type { ITokenService } from "../../domain/services/TokenService.ts";
import type {
  RefreshPayloadDto,
  RefreshTokenPayloadDto,
} from "../dto/auth.dto.ts";

export class RefreshTokenGenerationService {
  constructor(
    private _tokenService: ITokenService,
    private _refreshSession: IRefreshSessionRepository,
    private readonly _hashService: IHashService,
  ) {}
  async generate(user: RefreshPayloadDto): Promise<string | void> {
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
