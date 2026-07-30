import type { ServiceMode } from "../types/shared.types.ts";
import type {
  AddDoctorClinicProps,
  Leave,
  WeeklySchedule,
} from "../types/doctorClinic.types.ts";

export class DoctorClinic {
  constructor(
    public id: string | null,
    public doctorId: string | null,
    public clinicId: string | null,
    public type: ServiceMode,
    public consultationFee: number,
    public schedule: WeeklySchedule[],
    public leaves: Leave[],
    public slotDuration: number,
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
      data.schedule ?? [],
      data.leaves ?? [],
      data.slotDuration ?? 30,
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

  addLeave(leave: Leave) {
    this.leaves.push(leave);
  }

  removeLeave(id: string) {
    this.leaves = this.leaves.filter((l) => l.id !== id);
  }

  updateLeave(updated: Leave) {
    this.leaves.map((l) => (l.id === updated.id ? updated : l));
  }

  updateSchedule(schedule: WeeklySchedule[]) {
    this.schedule = schedule;
  }
  
}
