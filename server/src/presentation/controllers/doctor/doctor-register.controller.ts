import type { NextFunction, Request, Response } from "express";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import { ResponseStatusCode } from "../../../domain/enums/response.enums.ts";
import type { IDoctorRegisterUseCase } from "../../../application/repositories/doctor/IDoctorRegisterUseCase.ts";

export class DoctorRegisterController {
  constructor(private _doctorRegister: IDoctorRegisterUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {

      const data = req.body
      const files = req.files

      console.log(data);
      
      const updatedData = {
        ...data, gender: data.gender.toUpperCase(),
        mode: data.mode.toUpperCase(), latitude: Number(data.latitude),
        longitude: Number(data.longitude), consultationFee: Number(data.consultationFee)
      }
      await this._doctorRegister.execute({...updatedData, ...files});

      return res.status(ResponseStatusCode.CREATED).json({
        success: true,
        message: RESPONSE_MESSAGE.SUCCESS
      });
    } catch (error) {
      return next(error);
    }
  }
}
