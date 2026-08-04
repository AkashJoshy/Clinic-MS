import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enums.ts";
import type { ICreatePatientProfileUseCase } from "../../../application/repositories/patient/ICreatePatientProfileUseCase.ts";

export class CreatePatientProfileController {
  constructor(
    private readonly _createPatientProfile: ICreatePatientProfileUseCase,
  ) {}

  async handle(req: Request, res: Response, next: NextFunction) {
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

      const result = await this._createPatientProfile.execute({
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
}