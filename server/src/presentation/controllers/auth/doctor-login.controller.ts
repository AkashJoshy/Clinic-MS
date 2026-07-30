import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enums.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import type { ILoginUseCase } from "../../../application/repositories/auth/ILoginUseCase.ts";

export class DoctorLoginController {
  constructor(private readonly _clinicLogin: ILoginUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const result = await this._clinicLogin.execute(data);
      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.ACCOUNT_AUTHENTICATED,
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }
}
