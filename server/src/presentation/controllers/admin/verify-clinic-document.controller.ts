import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enums.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import type { IVerifyClinicDocumentUseCase } from "../../../application/repositories/admin/i-verify-clinic-document.usecase.ts";

export class VerifyClinicDocumentController {
  constructor(
    private readonly _verifyClinicDocumentUseCase: IVerifyClinicDocumentUseCase,
  ) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      let id = req.params.clinicId;
      id = Array.isArray(id) ? id[0] : id;

      const { name, ...data } = req.body;

      await this._verifyClinicDocumentUseCase.execute({ id: id!, ...data });

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.UPDATED.replace("Resource", "Clinic document"),
      });
    } catch (error) {
      return next(error);
    }
  }
}
