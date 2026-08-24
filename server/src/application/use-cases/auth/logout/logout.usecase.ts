import type {
  RefreshTokenPayloadDto,
  BaseUserDto,
  LogoutResponseDto,
} from "../../../dto/auth.dto.ts";
import type { IUserRepository } from "../../../../domain/repositories/IUserRepository.ts";
import { AuthError } from "../../../../domain/errors/auth.error.ts";
import type { IRefreshSessionRepository } from "../../../../domain/repositories/IRefreshSessionRepository.ts";
import type { IHashService } from "../../../../domain/services/hashService.ts";
import type { ITokenService } from "../../../../domain/services/TokenService.ts";
import { RefreshTokenExpiredError } from "../../../../domain/errors/refresh-token-expired.error.ts";
import { InvalidTokenError } from "../../../../domain/errors/invalid-token.error.ts";
import type { ILogoutUseCase } from "../../../repositories/auth/ILogoutUseCase.ts";
import { RefreshSessionNotFoundError } from "../../../../domain/errors/refresh-session-not-found.error.ts";

export class LogoutUseCase implements ILogoutUseCase {
  constructor(
    private _userRepository: IUserRepository,
    private _refreshSessionRepository: IRefreshSessionRepository,
    private _hashService: IHashService,
    private _tokenService: ITokenService,
  ) {}

  async execute(refreshToken: string): Promise<LogoutResponseDto> {
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
      throw new RefreshSessionNotFoundError("Token Expired");
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

    if (!refreshSession || !refreshSession.id) {
      throw new InvalidTokenError("Invalid token");
    }

    await this._refreshSessionRepository.findByIdAndUpdate(refreshSession.id, {
      revoked: true,
    });

    const { password, id, role, isBlocked, isActive, ...updatedUser } = user;

    const baseUser: BaseUserDto = {
      id,
      role,
      isBlocked,
      isActive,
    };

    return {
      user: baseUser,
    };
  }
}
