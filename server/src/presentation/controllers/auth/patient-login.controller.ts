import type { NextFunction, Request, Response } from "express";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import { ResponseStatusCode } from "../../../domain/enums/response.enums.ts";
import type { ILoginUseCase } from "../../../application/repositories/auth/ILoginUseCase.ts";

export class PatientLoginController {
  constructor(private _patientLogin: ILoginUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const result = await this._patientLogin.execute(data);
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
