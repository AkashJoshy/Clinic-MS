import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enums.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import type { IUpdatePatientProfilePictureUseCase } from "../../../application/repositories/patient/IUpdatePatientProfilePicture.UseCase.ts";

export class UpdatePatientProfilePictureController {
  constructor(private _updatePatientPicture: IUpdatePatientProfilePictureUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this._updatePatientPicture.execute(req.body)

      return res.status(ResponseStatusCode.CREATED).json({
        success: true,
        message: RESPONSE_MESSAGE.UPDATED.replace("Resource", "Profile Picture"),
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }
}