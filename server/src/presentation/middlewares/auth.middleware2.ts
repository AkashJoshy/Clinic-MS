import type { Request, Response, NextFunction } from "express";
import { ResponseStatusCode } from "../../domain/enums/response.enums.ts";
import { RESPONSE_MESSAGE } from "../../domain/constants/response.constant.ts";

export const authMiddleware2 = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      return res.status(ResponseStatusCode.UNAUTHORIZED).json({
        success: false,
        message: RESPONSE_MESSAGE.UNAUTHORIZED_ACCESS,
      });
    }
    
    if (req.user) {
      if ((req.user as any)?.isBlocked  || !(req.user as any)?.isActive) {
        return res.status(ResponseStatusCode.FORBIDDEN).json({
          success: false,
          message: RESPONSE_MESSAGE.UNAUTHORIZED_ACCESS,
        });
        
      }
    }

    next();
  } catch (error: any) {
    next(error);
  }
};
