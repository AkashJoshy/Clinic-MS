import type { ServiceMode } from "../types/shared.types.ts";
import type {
  AddDoctorClinicProps,
  Break,
  Exceptions,
  SlotRules,
  WeeklySchedule,
} from "../types/doctor-clinic.types.ts";
import { INITIAL_EXCEPTIONS, INITIAL_SCHEDULE, INITIAL_SLOT_RULES } from "../constants/doctor-clinic.constants.ts";

export class DoctorClinic {
  constructor(
    public id: string | null,
    public doctorId: string | null,
    public clinicId: string | null,
    public type: ServiceMode,
    public consultationFee: number,
    public weeklySchedule: WeeklySchedule[],
    public slotRules: SlotRules,
    public exceptions: Exceptions,
    public timeZone: string,
    public isActive: boolean,
    public readonly createdAt: Date | null,
    public updatedAt: Date | null,
  ) {}

  static create(data: Partial<AddDoctorClinicProps>): DoctorClinic {
    return new DoctorClinic(
      data.id ?? null,
      data.doctorId ?? null,
      data.clinicId ?? null,
      data.type ?? "BOTH",
      data.consultationFee ?? 0,
      data.weeklySchedule ?? INITIAL_SCHEDULE,
      data.slotRules ?? INITIAL_SLOT_RULES,
      data.exceptions ?? INITIAL_EXCEPTIONS,
      data.timeZone ?? "UTC",
      data.isActive ?? false,
      data.createdAt ?? null,
      data.updatedAt ?? null,
    );
  }

  static register(
    data: Partial<Omit<AddDoctorClinicProps, "isActive">>,
  ): DoctorClinic {
    return this.create({ ...data, isActive: false });
  }

  static registerWithApproval(
    data: Partial<Omit<AddDoctorClinicProps, "isActive">>,
  ): DoctorClinic {
    return this.create({ ...data, isActive: true });
  }

  activate() {
    if (this.isActive) {
      throw new Error("Doctor clinic is already active");
    }

    this.isActive = true;
  }

  deactivate() {
    if (!this.isActive) {
      throw new Error("Doctor clinic is already inactive");
    }

    this.isActive = false;
  }

  activeStatus() {
    return this.isActive;
  }

  updateSchedule(schedule: WeeklySchedule[]) {
    this.weeklySchedule = schedule;
  }

  updateSlotRules(newRules: SlotRules) {
    this.slotRules = newRules;
  }

  updateConsultationDetails(
    data: Pick<
      DoctorClinic,
      "consultationFee" | "type" | "timeZone"
    >,
  ) {
    this.consultationFee = Number(data.consultationFee);
    ((this.type = data.type), (this.timeZone = data.timeZone));
  }
}
