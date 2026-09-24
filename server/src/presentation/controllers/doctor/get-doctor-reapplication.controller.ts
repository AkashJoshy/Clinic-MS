import type { NextFunction, Request, Response } from "express";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import { ResponseStatusCode } from "../../../domain/enums/response.enums.ts";
import type { IDoctorReapplicationUseCase } from "../../../application/repositories/doctor/i-doctor-reapplication.usecase.ts";

export class GetDoctorReapplicationController {
  constructor(private _doctorReapplication: IDoctorReapplicationUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      let token = req.params.token;

      token = Array.isArray(token) ? token[0] : token;

      if (!token) {
        return res.status(ResponseStatusCode.UNAUTHORIZED).json({
          success: false,
          message: RESPONSE_MESSAGE.UNAUTHORIZED_ACCESS,
        });
      }

      const result = await this._doctorReapplication.execute(token as string);

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.SUCCESS,
        data: result,
      });

    } catch (error) {
      return next(error);
    }
  }
}
