import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enums.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import type { IUpdatePatientProfilePictureUseCase } from "../../../application/repositories/patient/IUpdatePatientProfilePicture.UseCase.ts";
import { NotFoundError } from "../../../domain/errors/not-found.error.ts";
import type User from "../../../domain/entities/User.ts";

export class UpdatePatientProfilePictureController {
  constructor(
    private _updatePatientPicture: IUpdatePatientProfilePictureUseCase,
  ) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      if (!req.file) {
        throw new NotFoundError("Profile Picture");
      }

      const result = await this._updatePatientPicture.execute({
        userId: (req.user as User).id!,
        ownerId: data.patientId,
        picture: req.file,
      });

      return res.status(ResponseStatusCode.CREATED).json({
        success: true,
        message: RESPONSE_MESSAGE.UPDATED.replace(
          "Resource",
          "Profile Picture",
        ),
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }
}
