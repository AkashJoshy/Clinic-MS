import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enums.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import type { IGetDoctorUseCase } from "../../../application/repositories/admin/IGetDoctorUseCase.ts";
import { NotFoundError } from "../../../domain/errors/not-found.error.ts";

export class GetDoctorController {
  constructor(private readonly _getDoctor: IGetDoctorUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {

      let doctorId = req.params.doctorId
      doctorId = Array.isArray(doctorId) ? doctorId[0] : doctorId

      if (!doctorId) {
        throw new NotFoundError("Doctor")
      }

      const data = await this._getDoctor.execute(doctorId)
         
      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.FETCHED.replace("Resource", "Doctors"),
        data: data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
