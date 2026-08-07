import type { NextFunction, Request, Response } from "express";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import { ResponseStatusCode } from "../../../domain/enums/response.enums.ts";
import type { IPatientRegisterUseCase } from "../../../application/repositories/auth/IPatientRegisterUsecase.ts";
import type { RegisterUserProps } from "../../../domain/types/user.types.ts";

export class PatientRegisterController {
  constructor(private _registerUser: IPatientRegisterUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { fullName, email, password, phone, role }: RegisterUserProps =
        req.body; 

      const result = await this._registerUser.execute({
        id: null,
        fullName,
        phone,
        email,
        password,
        role,
      });

      return res.status(ResponseStatusCode.CREATED).json({
        success: true,
        message: RESPONSE_MESSAGE.ACCOUNT_CREATED,
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }
}
