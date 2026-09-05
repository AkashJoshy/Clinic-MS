import type { Request, Response, NextFunction } from "express";
import { JWTService } from "../../infrastructure/services/jwt.service.ts";
import { UserRepository } from "../../infrastructure/repositories/user.repository.ts";
import { AuthError } from "../../domain/errors/auth.error.ts";

const jwtService = new JWTService();
const mongooseUserRepository = new UserRepository();

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      throw new AuthError("Unauthorized");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new AuthError("Unauthorized");
    }

    const decoded = jwtService.verifyAccessToken(token) as {
      userId: string;
      role: string;
    };

    const user = await mongooseUserRepository.findById(decoded.userId);

    if (!user) {
      throw new AuthError("User not found");
    }

    if (user.isBlocked || !user.isActive) {
      throw new AuthError("Unauthorized");
    }

    req.user = {
      id: user.id,
      role: user.role,
      isBlocked: user.isBlocked,
      isActive: user.isActive,
    };

    next();
  } catch (error) {
    next(error);
  }
};
