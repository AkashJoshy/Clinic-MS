import type {
  AccessPayloadDto,
  RefreshTokenResponseDto,
  RefreshTokenPayloadDto,
  BaseUserDto,
} from "../../../dto/auth.dto.ts";
import type { IAccessTokenGenerationService } from "../../../IService/IAccessTokenGenerationService.ts";
import type { IRefreshUseCase } from "../../../repositories/auth/IRefreshUseCase.ts";
import type { IUserRepository } from "../../../../domain/repositories/IUserRepository.ts";
import { AuthError } from "../../../../domain/errors/auth.error.ts";
import type { IRefreshSessionRepository } from "../../../../domain/repositories/IRefreshSessionRepository.ts";
import type { IHashService } from "../../../../domain/services/hashService.ts";
import type { ITokenService } from "../../../../domain/services/TokenService.ts";
import { RefreshTokenExpiredError } from "../../../../domain/errors/refresh-token-expired.error.ts";
import { InvalidTokenError } from "../../../../domain/errors/invalid-token.error.ts";

export class RefreshTokenUseCase implements IRefreshUseCase {
  constructor(
    private _userRepository: IUserRepository,
    private _refreshSessionRepository: IRefreshSessionRepository,
    private _hashService: IHashService,
    private _tokenService: ITokenService,
    private _accessTokenGenerationService: IAccessTokenGenerationService,
  ) {}

  async execute(refreshToken: string): Promise<RefreshTokenResponseDto> {
    const decoded = this._tokenService.verifyRefreshToken(
      refreshToken,
    ) as RefreshTokenPayloadDto;

    const user = await this._userRepository.findById(decoded.userId);

    if (!user || !user.id) {
      throw new AuthError("User not found");
    }

    const refreshSessions =
      await this._refreshSessionRepository.findAllByUserId(user.id);

    if (refreshSessions.length === 0) {
      throw new RefreshTokenExpiredError("Token Expired");
    }

    let refreshSession;

    for (let session of refreshSessions) {
      const isTokenMatched = await this._hashService.compare(
        decoded.tokenId,
        session.tokenId,
        "Token",
      );

      if (isTokenMatched) {
        refreshSession = session;
        break;
      }
    }

    if (!refreshSession) {
      throw new InvalidTokenError("Invalid refresh token");
    }

    const payload: AccessPayloadDto = {
      id: user.id,
      role: user.role,
    };

    const accessToken =
      await this._accessTokenGenerationService.generate(payload);

    const { password, id, role, isBlocked, isActive, ...updatedUser } = user;

    const baseUser: BaseUserDto = {
      id,
      role,
      isBlocked,
      isActive,
    };

    return {
      user: baseUser,
      accessToken: accessToken!,
    };
  }
}
