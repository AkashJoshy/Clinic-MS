import type { IDoctorReapplication } from "../../infrastructure/models/doctor-reapplication.model.ts";
import type {
  DoctorReapplication,
} from "../entities/doctor-reapplication.entity.ts";
import type { DoctorReapplicationStatus } from "../types/doctor.types.ts";
import type { IBaseRepository } from "./i-base.repository.ts";

export interface CreateDoctorReapplicationData {
  doctorId: string;

  tokenHash: string;
  tokenExpiresAt: Date;

  fieldsToReupload: string[];

  status?: DoctorReapplicationStatus;
}

export interface UpdateDoctorReapplicationData {
  status?: DoctorReapplicationStatus;
  fieldsToReupload: string[];
  rejectionReason?: string | null;
  reviewMessage?: string | null;
  reviewedReason?: string | null;
  submittedAt: Date | null;
  reviewedAt: Date | null;
}

export interface IDoctorReapplicationRepository extends IBaseRepository<DoctorReapplication, IDoctorReapplication> {
  findByDoctorId(doctorId: string): Promise<DoctorReapplication | null>;
  findByTokenHash(tokenHash: string): Promise<DoctorReapplication | null>;
}
