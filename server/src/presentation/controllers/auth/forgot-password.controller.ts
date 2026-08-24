import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enums.ts";
import type { IForgotPasswordUseCase } from "../../../application/repositories/auth/IForgotPasswordUseCase.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";

export class ForgotPasswordController {
  constructor(private readonly forgotPasswordUseCase: IForgotPasswordUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      await this.forgotPasswordUseCase.execute(req.body);

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.PASSWORD_RESET_LINK,
      });
    } catch (error) {
      return next(error);
    }
  }
}
