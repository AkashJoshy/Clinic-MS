import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enum.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import type { IGetAllDoctorsUseCase } from "../../../application/interfaces/repositories/patient/doctor/i-get-all-doctors.usecase.ts";

export class DoctorController {
  constructor(private readonly _getDoctors: IGetAllDoctorsUseCase) {}

  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this._getDoctors.execute();

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
