import type { SlotStatus } from "../types/doctor-clinic.types.ts";
import type { ServiceMode } from "../types/shared.types.ts";
import type { SlotProps } from "../types/slot.types.ts";

export class Slot {
  constructor(
    public readonly id: string | null,
    public readonly doctorId: string,
    public readonly clinicId: string,
    public readonly doctorClinicId: string,
    public readonly date: Date,
    public readonly startTime: string,
    public readonly endTime: string,
    public readonly mode: ServiceMode,
    public status: SlotStatus,
    public readonly createdAt: Date | null,
    public updatedAt: Date | null,
  ) {}

  static create(props: Partial<SlotProps>): Slot {
    return new Slot(
      props.id ?? null,
      props.doctorId!,
      props.clinicId!,
      props.doctorClinicId!,
      props.date ?? new Date(),
      props.startTime ?? "09:00",
      props.endTime ?? "09:30",
      props.mode ?? "ONLINE",
      props.status!,
      props.createdAt ?? null,
      props.updatedAt ?? null,
    );
  }

  static createAvailable(props: Omit<Slot, "status">) {
    return Slot.create({ ...props, status: "AVAILABLE" });
  }

  static createBooked(props: Omit<Slot, "status">) {
    return Slot.create({ ...props, status: "BOOKED" });
  }
}
