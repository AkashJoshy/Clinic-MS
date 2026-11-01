import type { NextFunction, Request, Response } from "express";
import type { IUpdateDoctorStatusUseCase } from "../../../application/interfaces/repositories/admin/i-update-doctor-status.usecase.ts";
import { ResponseStatusCode } from "../../../domain/enums/response.enum.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import type { IGetAllDoctorsUseCase } from "../../../application/interfaces/repositories/admin/doctor/i-get-all-doctors.usecase.ts";
import { NotFoundError } from "../../../domain/errors/not-found.error.ts";
import type { IGetDoctorUseCase } from "../../../application/interfaces/repositories/admin/i-get-doctor.usecase.ts";
import type { IUpdateStatusUseCase } from "../../../application/interfaces/repositories/admin/patient/i-update-status.usecase.ts";
import type { IVerifyClinicDocumentUseCase } from "../../../application/interfaces/repositories/admin/i-verify-clinic-document.usecase.ts";
import type { IVerifyDoctorDocumentUseCase } from "../../../application/interfaces/repositories/admin/doctor/i-verify-document.usecase.ts";

export class DoctorController {
  constructor(
    private readonly _getDoctor: IGetDoctorUseCase,
    private readonly _getDoctors: IGetAllDoctorsUseCase,
    private readonly _updateDoctor: IUpdateStatusUseCase,
    private readonly _approveDoctor: IUpdateDoctorStatusUseCase,
    private readonly _rejectDoctor: IUpdateDoctorStatusUseCase,
    private readonly _verifyClinicDocumentUseCase: IVerifyClinicDocumentUseCase,
    private readonly _verifyDoctorDocumentUseCase: IVerifyDoctorDocumentUseCase,
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
