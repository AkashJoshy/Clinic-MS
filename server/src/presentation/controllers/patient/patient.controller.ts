import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enum.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import type { IUpdateAddressUseCase } from "../../../application/interfaces/repositories/shared/i-update-address.usecase.ts";
import type { UpdateAddressDto } from "../../../application/dto/shared.dto.ts";
import type { IUpdateEmergencyContactUseCase } from "../../../application/interfaces/repositories/patient/profile/i-update-emergency-contact.usecase.ts";
import type { EmergencyContact } from "../../../domain/types/patient.types.ts";
import type { RelationToPatient } from "../../../domain/constants/patient.constants.ts";
import type { IUpdateProfilePictureUseCase } from "../../../application/interfaces/repositories/shared/i-update-profile-picture.usecase.ts";
import { NotFoundError } from "../../../domain/errors/not-found.error.ts";
import type User from "../../../domain/entities/user.entity.ts";
import type { IPatientProfilesUseCase } from "../../../application/interfaces/repositories/patient/profile/i-patient-profiles.usecase.ts";
import type { ICreatePatientProfileUseCase } from "../../../application/interfaces/repositories/patient/profile/i-create-patient-profile.usecase.ts";
import type { IUpdatePatientProfileUseCase } from "../../../application/interfaces/repositories/patient/profile/i-update-patient-profile.usecase.ts";

export class PatientController {
  constructor(
    private readonly _patientProfiles: IPatientProfilesUseCase,
    private readonly _createProfile: ICreatePatientProfileUseCase,
    private readonly _updateProfile: IUpdatePatientProfileUseCase,
    private readonly _updateAddress: IUpdateAddressUseCase,
    private readonly _updateEmergencyContact: IUpdateEmergencyContactUseCase,
    private readonly _updatePatientPicture: IUpdateProfilePictureUseCase,
  ) {}

  async getProfiles(req: Request, res: Response, next: NextFunction) {
    try {
      let userId = req.params.userId;

      userId = Array.isArray(userId) ? userId[0] : userId;

      if (!userId) {
        return res.status(ResponseStatusCode.UNAUTHORIZED).json({
          success: false,
          message: RESPONSE_MESSAGE.UNAUTHORIZED_ACCESS,
        });
      }
      const result = await this._patientProfiles.execute(userId);

      return res.status(ResponseStatusCode.CREATED).json({
        success: true,
        message: RESPONSE_MESSAGE.SUCCESS,
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }

  async createProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        name,
        relation,
        dateOfBirth,
        gender,
        bloodGroup,
        allergies,
        chronicConditions,
        addressLine,
        country,
        state,
        city,
        pincode,
      } = req.body;

      const result = await this._createProfile.execute({
        userId: (req.user as any).id!,
        phone: (req.user as any).phone,
        displayName: name,
        relation: relation.toUpperCase(),
        dateOfBirth,
        gender: gender.toUpperCase(),
        bloodGroup,
        allergies,
        chronicConditions,
        addressLine,
        country,
        state,
        city,
        pincode,
      });

      return res.status(ResponseStatusCode.CREATED).json({
        success: true,
        message: "Patient profile created successfully",
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const idsParam = req.params.patientId;
      const id = Array.isArray(idsParam) ? idsParam[0] : idsParam;

      if (!id) {
        return res.status(ResponseStatusCode.BAD_REQUEST).json({
          success: false,
          message: RESPONSE_MESSAGE.USER_NOT_FOUND,
        });
      }

      const {
        displayName,
        email,
        phone,
        dateOfBirth,
        gender,
        bloodGroup,
        allergies,
        chronicConditions,
      } = req.body;

      const result = await this._updateProfile.execute({
        displayName,
        id: id!,
        dateOfBirth,
        gender,
        email,
        phone,
        medicalInformation: {
          bloodGroup,
          allergies,
          chronicConditions,
        },
      });

      return res.status(ResponseStatusCode.CREATED).json({
        success: true,
        message: RESPONSE_MESSAGE.UPDATED.replace("Resource", "Profile"),
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }

  async updateAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const idsParam = req.params.ownerId;
      const ownerId = Array.isArray(idsParam) ? idsParam[0] : idsParam;

      if (!ownerId) {
        return res.status(ResponseStatusCode.BAD_REQUEST).json({
          success: false,
          message: RESPONSE_MESSAGE.USER_NOT_FOUND,
        });
      }

      const {
        addressLine,
        country,
        state,
        city,
        pincode,
      }: Omit<UpdateAddressDto, "ownerId"> = req.body;

      const result = await this._updateAddress.execute({
        ownerId,
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

  async updateProfileEmergencyContact(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const idsParam = req.params.patientId;
      const patientId = Array.isArray(idsParam) ? idsParam[0] : idsParam;

      if (!patientId) {
        return res.status(ResponseStatusCode.BAD_REQUEST).json({
          success: false,
          message: RESPONSE_MESSAGE.USER_NOT_FOUND,
        });
      }

      const { name, phone, relationship }: EmergencyContact = req.body;

      const result = await this._updateEmergencyContact.execute({
        id: patientId,
        name,
        phone,
        relationship: relationship.toUpperCase() as RelationToPatient,
      });

      return res.status(ResponseStatusCode.ACCEPTED).json({
        success: true,
        message: RESPONSE_MESSAGE.UPDATED.replace(
          "Resource",
          "Emergency Contact",
        ),
        data: result,
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
