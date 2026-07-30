import type { NextFunction, Request, Response } from "express";
import type { RegisterProps } from "../../../types/user.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import { ResponseStatusCode } from "../../../domain/enums/response.enums.ts";
import type { IPatientRegisterUseCase } from "../../../application/repositories/auth/IPatientRegisterUsecase.ts";

export class PatientRegisterController {
  constructor(private _registerUser: IPatientRegisterUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      // if (!req.user) {
      //   return res.status(ResponseStatusCode.UNAUTHORIZED).json({
      //     success: false,
      //     message: RESPONSE_MESSAGE.UNAUTHORIZED_ACCESS,
      //   });
      // }

      const { fullName, email, password, phone, role }: RegisterProps =
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
