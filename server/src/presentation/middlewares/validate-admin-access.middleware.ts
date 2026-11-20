import type { Request, Response, NextFunction } from "express";
import { UserRepository } from "../../infrastructure/repositories/user.repository.ts";
import { AuthError } from "../../domain/errors/auth.error.ts";
import type User from "../../domain/entities/user.entity.ts";
import { ForbiddenError } from "../../domain/errors/forbidden.error.ts";
import { mongooseUserRepository } from "../../container/infrastructure.container.ts";

export const validateAdminAccess = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req.user as User)?.id!;
    const admin = await mongooseUserRepository.findById(userId);

    if (!admin || !admin.id) {
      throw new AuthError("Access Denied");
    }

    if (admin.isBlocked || !admin.isActive) {
      throw new AuthError("Unauthorized");
    }

    if (admin.role !== "ADMIN") {
      throw new ForbiddenError("Access Denied");
    }

    next();
  } catch (error) {
    next(error);
  }
};
