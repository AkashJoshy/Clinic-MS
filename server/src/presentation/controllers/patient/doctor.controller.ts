import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enum.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import type { IGetAllDoctorsUseCase } from "../../../application/interfaces/repositories/patient/doctor/i-get-all-doctors.usecase.ts";
import type { GetPatientDoctorsQueryDto } from "../../../application/dto/doctor.dto.ts";

export class DoctorController {
  constructor(private readonly _getDoctors: IGetAllDoctorsUseCase) {}

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = req.query.page
        ? parseInt(req.query.page as string, 10)
        : 1;
      const limit = req.query.limit
        ? parseInt(req.query.limit as string, 10)
        : 6;
      const search = req.query.search
        ? (req.query.search as string)
        : undefined;
      const gender = req.query.gender
        ? (req.query.gender as string)
        : undefined;
      const experience = req.query.experience
        ? (req.query.experience as string)
        : undefined;
      const rating = req.query.rating
        ? (req.query.rating as string)
        : undefined;
      const sort = req.query.sort ? (req.query.sort as string) : undefined;

      let specializations: string[] | undefined;
      if (req.query.specializations) {
        if (Array.isArray(req.query.specializations)) {
          specializations = req.query.specializations as string[];
        } else if (typeof req.query.specializations === "string") {
          specializations = (req.query.specializations as string)
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        }
      }

      let consultationModes: string[] | undefined;
      if (req.query.consultationModes) {
        if (Array.isArray(req.query.consultationModes)) {
          consultationModes = req.query.consultationModes as string[];
        } else if (typeof req.query.consultationModes === "string") {
          consultationModes = (req.query.consultationModes as string)
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        }
      }

      const queryDto: GetPatientDoctorsQueryDto = {
        page,
        limit,
        search,
        gender,
        experience,
        rating,
        sort,
        specializations,
        consultationModes,
      };

      const data = await this._getDoctors.execute(queryDto);

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
