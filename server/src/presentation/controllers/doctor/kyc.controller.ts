import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enum.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import type User from "../../../domain/entities/user.entity.ts";
import type { IUpdateDoctorPanDetailsUseCase } from "../../../application/interfaces/repositories/doctor/kyc/i-update-doctor-pan-details.usecase.ts";
import { NotFoundError } from "../../../domain/errors/not-found.error.ts";
import type { IUpdateDoctorBankDetailsUseCase } from "../../../application/interfaces/repositories/doctor/kyc/i-update-doctor-bank-details.usecase.ts";
import type { IUpdateDoctorAadhaarDetailsUseCase } from "../../../application/interfaces/repositories/doctor/kyc/i-update-doctor-aadhaar-details.usecase.ts";
import type { IGetDoctorPanDetailsUseCase } from "../../../application/interfaces/repositories/doctor/kyc/i-get-doctor-pan-details.usecase.ts";
import type { IGetDoctorBankDetailsUseCase } from "../../../application/interfaces/repositories/doctor/kyc/i-get-doctor-bank-details.usecase.ts";
import type { IGetDoctorAadhaarDetailsUseCase } from "../../../application/interfaces/repositories/doctor/kyc/i-get-doctor-aadhaar-details.usecase.ts";
import type { IGetDoctorKycDetailsUseCase } from "../../../application/interfaces/repositories/doctor/kyc/i-get-doctor-kyc-details.usecase.ts";

export class DoctorKycController {
  constructor(
    private readonly _updatePanDetailsUseCase: IUpdateDoctorPanDetailsUseCase,
    private readonly _updateBankDetailsUseCase: IUpdateDoctorBankDetailsUseCase,
    private readonly _updateAadhaarDetailsUseCase: IUpdateDoctorAadhaarDetailsUseCase,
    private readonly _getPanDetailsUseCase: IGetDoctorPanDetailsUseCase,
    private readonly _getBankDetailsUseCase: IGetDoctorBankDetailsUseCase,
    private readonly _getAadhaarDetailsUseCase: IGetDoctorAadhaarDetailsUseCase,
    private readonly _getDoctorKycDetailsUseCase: IGetDoctorKycDetailsUseCase,
  ) {}

  async getDoctorKycDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const kycDetails = await this._getDoctorKycDetailsUseCase.execute(
        (req.user as User).id!,
      );

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.FETCHED.replace(
          "Resource",
          "Doctor KYC details",
        ),
        data: kycDetails,
        silent: true,
      });
    } catch (error) {
      next(error);
    }
  }

  async getPanDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const panDetails = await this._getPanDetailsUseCase.execute(
        (req.user as User)?.id!,
      );

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.FETCHED.replace("Resource", "PAN details"),
        data: panDetails,
        silent: true,
      });
    } catch (error) {
      next(error);
    }
  }

  async getBankDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const bankDetails = await this._getBankDetailsUseCase.execute(
        (req.user as User)?.id!,
      );

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.FETCHED.replace("Resource", "Bank details"),
        data: bankDetails,
        silent: true,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAadhaarDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const aadhaarDetails = await this._getAadhaarDetailsUseCase.execute(
        (req.user as User)?.id!,
      );

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.FETCHED.replace(
          "Resource",
          "Aadhaar details",
        ),
        data: aadhaarDetails,
        silent: true,
      });
    } catch (error) {
      next(error);
    }
  }

  async updatePanDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const panDetails = await this._updatePanDetailsUseCase.execute(
        (req.user as User)?.id!,
        req.body,
        req.file ? req.file : req.body.panCardDoc,
      );

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.UPDATED.replace("Resource", "KYC PAN"),
        data: panDetails,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateBankDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const bankDetails = await this._updateBankDetailsUseCase.execute(
        (req.user as User)?.id!,
        req.body,
      );

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.UPDATED.replace(
          "Resource",
          "KYC Bank Account",
        ),
        data: bankDetails,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateAadhaarDetails(req: Request, res: Response, next: NextFunction) {
    try {
    
      const aadhaarDetails = await this._updateAadhaarDetailsUseCase.execute(
        (req.user as User)?.id!,
        req.body,
        req.file ? req.file : req.body.aadhaarCardDoc,
      );

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.UPDATED.replace("Resource", "KYC Aadhaar"),
        data: aadhaarDetails,
      });
    } catch (error) {
      next(error);
    }
  }
}
