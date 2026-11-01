import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enum.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import type { IDoctorProfileUseCase } from "../../../application/interfaces/repositories/doctor/profile/i-doctor-profile.usecase.ts";
import type { IUpdateAddressUseCase } from "../../../application/interfaces/repositories/shared/i-update-address.usecase.ts";
import type { UpdateAddressDto } from "../../../application/dto/shared.dto.ts";
import type { IDoctorConsultationUseCase } from "../../../application/interfaces/repositories/doctor/profile/i-doctor-consultation.usecase.ts";
import type { IDoctorProfessionalUseCase } from "../../../application/interfaces/repositories/doctor/profile/i-doctor-professional.usecase.ts";
import { NotFoundError } from "../../../domain/errors/not-found.error.ts";
import type { IUpdateProfilePictureUseCase } from "../../../application/interfaces/repositories/shared/i-update-profile-picture.usecase.ts";
import type User from "../../../domain/entities/user.entity.ts";

export class DoctorController {
  constructor(
    private readonly _doctorProfile: IDoctorProfileUseCase,
    private readonly _updateAddress: IUpdateAddressUseCase,
    private readonly _updateConsultation: IDoctorConsultationUseCase,
    private readonly _updateProfessional: IDoctorProfessionalUseCase,
    private readonly _updateProfilePicture: IUpdateProfilePictureUseCase,
  ) {}

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      let userId = req.params.userId;

      userId = Array.isArray(userId) ? userId[0] : userId;

      if (!userId) {
        return res.status(ResponseStatusCode.UNAUTHORIZED).json({
          success: false,
          message: RESPONSE_MESSAGE.UNAUTHORIZED_ACCESS,
        });
      }

      const result = await this._doctorProfile.execute(userId);

      return res.status(ResponseStatusCode.CREATED).json({
        success: true,
        message: RESPONSE_MESSAGE.SUCCESS,
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }

  async updateAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const idsParam = req.params.onwerId;
      const ownerId = Array.isArray(idsParam) ? idsParam[0] : idsParam;

      const {
        addressLine,
        country,
        state,
        city,
        pincode,
      }: Omit<UpdateAddressDto, "ownerId"> = req.body;

      const result = await this._updateAddress.execute({
        ownerId: ownerId!,
        addressLine,
        country,
        state,
        city,
        pincode,
      });

      return res.status(ResponseStatusCode.CREATED).json({
        success: true,
        message: RESPONSE_MESSAGE.UPDATED.replace("Resource", "Address"),
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }

  async updateConsulationDetails(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      let userId = req.params.userId;
      const data = req.body;

      userId = Array.isArray(userId) ? userId[0] : userId;

      const response = await this._updateConsultation.execute({
        ...data,
        userId,
      });

      return res.status(ResponseStatusCode.ACCEPTED).json({
        success: true,
        message: RESPONSE_MESSAGE.ACCOUNT_UPDATED.replace(
          "Account",
          "Consultation Details",
        ),
        data: response,
      });
    } catch (error) {
      return next(error);
    }
  }

  async updateProfessionalDetails(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      let userId = req.params.userId;
      const data = req.body;

      userId = Array.isArray(userId) ? userId[0] : userId;

      const response = await this._updateProfessional.execute({
        ...data,
        userId,
      });

      return res.status(ResponseStatusCode.ACCEPTED).json({
        success: true,
        message: RESPONSE_MESSAGE.ACCOUNT_UPDATED.replace(
          "Account",
          "Doctor Details",
        ),
        data: response,
      });
    } catch (error) {
      return next(error);
    }
  }

  async updateProfilePicture(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      if (!req.file) {
        throw new NotFoundError("Profile Picture");
      }

      const result = await this._updateProfilePicture.execute({
        userId: (req.user as User).id!,
        ownerId: data.doctorId,
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
