import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enum.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import type { IGetAllDoctorsUseCase } from "../../../application/interfaces/repositories/admin/doctor/i-get-all-doctors.usecase.ts";
import { NotFoundError } from "../../../domain/errors/not-found.error.ts";
import type { IUpdateStatusUseCase } from "../../../application/interfaces/repositories/admin/patient/i-update-status.usecase.ts";
import type { IGetDoctorUseCase } from "../../../application/interfaces/repositories/admin/doctor/i-get-doctor.usecase.ts";
import type { IVerifyDocumentUseCase } from "../../../application/interfaces/repositories/admin/doctor/i-verify-document.usecase.ts";
import type { IReviewDoctorUseCase } from "../../../application/interfaces/repositories/admin/doctor/i-review-doctor.usecase.ts";
import type { GetAllDoctorsQueryDto } from "../../../application/dto/doctor.dto.ts";

export class DoctorController {
  constructor(
    private readonly _getDoctor: IGetDoctorUseCase,
    private readonly _getDoctors: IGetAllDoctorsUseCase,
    private readonly _updateDoctor: IUpdateStatusUseCase,
    private readonly _approveDoctor: IReviewDoctorUseCase,
    private readonly _rejectDoctor: IReviewDoctorUseCase,
    private readonly _verifyClinicDocumentUseCase: IVerifyDocumentUseCase,
    private readonly _verifyDoctorDocumentUseCase: IVerifyDocumentUseCase,
  ) {}

  async approveDoctor(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      let id = req.params.doctorId;
      id = Array.isArray(id) ? id[0] : id;

      await this._approveDoctor.execute({ ...data, id });

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.APPROVED.replace("Resource", "Doctor"),
      });
    } catch (error) {
      return next(error);
    }
  }

  async rejectDoctor(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      let id = req.params.doctorId;
      id = Array.isArray(id) ? id[0] : id;

      await this._rejectDoctor.execute({ ...data, id });

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.REJECTED.replace("Resource", "Doctor"),
      });
    } catch (error) {
      return next(error);
    }
  }

  async getAllDoctors(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(`Query in the Controller: `);
      console.log(req.query);

      const query: GetAllDoctorsQueryDto = {
        ...(req.query.search && {
          search: String(req.query.search),
        }),
        ...(req.query.gender && {
          gender: String(
            req.query.gender,
          ).toUpperCase() as GetAllDoctorsQueryDto["gender"],
        }),
        ...(req.query.departmentIds && {
          departmentIds: Array.isArray(req.query.departmentIds)
            ? req.query.departmentIds.map(String)
            : [String(req.query.departmentIds)],
        }),
        sortBy: String(req.query.sortBy ?? "NEWEST"),
        limit: Number(req.query.limit ?? 10),
        approvedPage: Number(req.query.approvedPage ?? 1),
        pendingPage: Number(req.query.pendingPage ?? 1),
        rejectedPage: Number(req.query.rejectedPage ?? 1),
      };

      const result = await this._getDoctors.execute(query);

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.FETCHED.replace("Resource", "Doctors"),
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }

  async getDoctor(req: Request, res: Response, next: NextFunction) {
    try {
      let doctorId = req.params.doctorId;
      doctorId = Array.isArray(doctorId) ? doctorId[0] : doctorId;

      if (!doctorId) {
        throw new NotFoundError("Doctor");
      }

      const data = await this._getDoctor.execute(doctorId);

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.FETCHED.replace("Resource", "Doctors"),
        data: data,
      });
    } catch (error) {
      return next(error);
    }
  }

  async updateDoctor(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      let id = req.params.doctorId;
      id = Array.isArray(id) ? id[0] : id;

      const response = await this._updateDoctor.execute({ ...data, id });

      const { message, ...userData } = response;

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message,
        data: userData,
      });
    } catch (error) {
      return next(error);
    }
  }

  async verifyClinicDocument(req: Request, res: Response, next: NextFunction) {
    try {
      let id = req.params.clinicId;
      id = Array.isArray(id) ? id[0] : id;

      const { name, ...data } = req.body;

      await this._verifyClinicDocumentUseCase.execute({ id: id!, ...data });

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.UPDATED.replace(
          "Resource",
          "Clinic document",
        ),
      });
    } catch (error) {
      return next(error);
    }
  }

  async verifyDoctorDocument(req: Request, res: Response, next: NextFunction) {
    try {
      let id = req.params.doctorId;
      id = Array.isArray(id) ? id[0] : id;

      const { name, ...data } = req.body;

      await this._verifyDoctorDocumentUseCase.execute({ id: id!, ...data });

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.UPDATED.replace(
          "Resource",
          "Doctor document",
        ),
      });
    } catch (error) {
      return next(error);
    }
  }
}
