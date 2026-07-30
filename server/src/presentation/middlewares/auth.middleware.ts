import type { Request, Response, NextFunction } from "express";
import { JWTService } from "../../infrastructure/services/JWTService.js";
import { MongoosePatientRepository } from "../../infrastructure/repositories/mongoose-patient.repository.js";
import { MongooseUserRepository } from "../../infrastructure/repositories/mongoose-user.repository.js";
import { AuthError } from "../../domain/errors/auth.error.js";

const jwtService = new JWTService();
const mongooseUserRepository = new MongooseUserRepository();

export const authMiddleware = async (
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

    const decoded = jwtService.verifyToken(token) as {
      userId: string;
      role: string;
    };

    if (!decoded || !decoded.userId) {
      throw new AuthError("Invalid token");
    }

    const user = await mongooseUserRepository.findById(decoded.userId);
    if (!user) {
      throw new AuthError("User not found");
    }

    req.user = {
      id: user.id,
      role: user.role,
      isBlocked: user.isBlocked,
      isActive: user.isActive,
    };
    next();
  } catch (error: any) {
    next(error);
  }
};
