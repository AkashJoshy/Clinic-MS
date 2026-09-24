import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enums.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import type { IVerifyDoctorDocumentUseCase } from "../../../application/repositories/admin/i-verify-doctor-document.usecase.ts";

export class VerifyDoctorDocumentController {
  constructor(
    private readonly _verifyDoctorDocumentUseCase: IVerifyDoctorDocumentUseCase,
  ) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      let id = req.params.doctorId;
      id = Array.isArray(id) ? id[0] : id;

      const { name, ...data } = req.body;

      await this._verifyDoctorDocumentUseCase.execute({ id: id!, ...data });

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.UPDATED.replace("Resource", "Doctor document"),
      });
    } catch (error) {
      return next(error);
    }
  }
}
