import type { ZodType } from "zod";
import type { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    console.log(`Result from Validate Middleware`);
    console.log(result);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: result.error.issues,
        message: result.error.issues[0]?.message ?? "Validation Failed",
      });
    }

    req.body = result.data;
    next();
  };
