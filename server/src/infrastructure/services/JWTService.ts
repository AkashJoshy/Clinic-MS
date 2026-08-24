
import { AuthError } from "../../domain/errors/auth.error.ts";
import { InternalServerError } from "../../domain/errors/internal-server.error.js";
import type { ITokenService } from "../../domain/services/TokenService.js";
import jwt, { type JwtPayload} from "jsonwebtoken";
import {
  narrowedExpiresIn,
  tokenSignInOptions,
} from "../../shared/utils/token.helper.ts";
import type { AccessTokenPayloadDto, RefreshTokenPayloadDto } from "../../application/dto/auth.dto.ts";
import { TokenExpiredAppError } from "../../domain/errors/token-expired.error.ts";
import ErrorCode from "../../domain/enums/error-code.enums.ts";
import { InvalidTokenError } from "../../domain/errors/invalid-token.error.ts";

const secret = process.env.JWT_SECRET;
const accessTokenexpiresIn = process.env.JWT_ACCESS_TOKEN_EXPIRES_IN;
const refreshTokenexpiresIn = process.env.JWT_REFRESH_TOKEN_EXPIRES_IN;

if (!secret || !accessTokenexpiresIn || !refreshTokenexpiresIn) {
  throw new InternalServerError("Error in the Authetication");
}

const accessNarrowedExpiresIn = narrowedExpiresIn(accessTokenexpiresIn);
const refreshNarrowedExpiresIn = narrowedExpiresIn(refreshTokenexpiresIn);

export class JWTService implements ITokenService {
  private readonly secret: string = secret as string;

  generateAccessToken(payload: AccessTokenPayloadDto): string {
    const options = tokenSignInOptions(accessNarrowedExpiresIn);

    return jwt.sign(payload, this.secret, options);
  }

  generateRefreshToken(payload: RefreshTokenPayloadDto): string {
    const options = tokenSignInOptions(refreshNarrowedExpiresIn);

    return jwt.sign(payload, this.secret, options);
  }

  verifyAccessToken(token: string): AccessTokenPayloadDto {
    try {
      const decoded = jwt.verify(token, this.secret) as JwtPayload;
      return decoded as AccessTokenPayloadDto
    } catch (error) {
      if ((error as any).name === "TokenExpiredError") {
        console.log(`Token Expire Error`)
        throw new TokenExpiredAppError(ErrorCode.TOKEN_EXPIRED);
      }
      
      throw new InvalidTokenError(ErrorCode.INVALID_TOKEN);
    }
  }
  
  verifyRefreshToken(token: string): RefreshTokenPayloadDto {
    try {
      const decoded = jwt.verify(token, this.secret) as JwtPayload;
      return decoded as RefreshTokenPayloadDto
    } catch (error) {
      if ((error as any).name === "TokenExpiredError") {
        throw new TokenExpiredAppError(ErrorCode.REFRESH_TOKEN_EXPIRED);
      }
      
      throw new InvalidTokenError(ErrorCode.INVALID_TOKEN);
    }
  }
}
