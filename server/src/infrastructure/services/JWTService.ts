import type { PayloadDTO } from "../../application/dto/auth.dto.ts";
import type User from "../../domain/entities/User.ts";
import { AuthError } from "../../domain/errors/auth.error.ts";
import { InternalServerError } from "../../domain/errors/internal-server.error.js";
import type { ITokenService } from "../../domain/services/TokenService.js";
import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES_IN;

if (!secret || !expiresIn) {
  throw new InternalServerError("Error in the Authetication");
}

const narrowedExpiresIn = expiresIn as Exclude<
  SignOptions["expiresIn"],
  undefined
>;

export class JWTService implements ITokenService {
  private readonly secret: string = secret as string;

  generateToken(payload: PayloadDTO): string {
    if (!secret) throw new InternalServerError("Error in the Authetication");
    const options: SignOptions = {
      algorithm: "HS256",
      expiresIn: narrowedExpiresIn,
    };

    return jwt.sign(payload, this.secret, options);
  }

  verifyToken(token: string): Record<string, unknown> {
    try {
      const decoded = jwt.verify(token, this.secret) as JwtPayload;
      return decoded as Record<string, unknown>;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new AuthError("Token expired")
      }
      throw new AuthError("Invalid token")
    } 
  }
}
