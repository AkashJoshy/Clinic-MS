import type { ZodType } from "zod";
import type { Request, Response, NextFunction } from "express";

export const validateFile =
  (schema: ZodType<Express.Multer.File | undefined>) =>
  (req: Request, res: Response, next: NextFunction) => {
    console.log("Result from Validate File Middleware");
    console.log(req.file);

    const result = schema.safeParse(req.file);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: result.error.issues,
        message: result.error.issues[0]?.message ?? "Validation Failed",
      });
    }

    req.file = result.data;

    next();
  };