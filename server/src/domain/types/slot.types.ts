import type { Slot } from "../entities/slot.entity.ts";
import type { SlotStatus } from "./doctor-clinic.types.ts";
import type { ServiceMode } from "./shared.types.ts";

export interface SlotProps {
  id: string | null;
  doctorId: string;
  clinicId: string;
  doctorClinicId: string;
  date: Date;
  startTime: string;
  endTime: string;
  mode: ServiceMode;
  status: SlotStatus;
  createdAt: Date | null;
  updatedAt: Date | null;
}

// export type SafeSlot = Pick<Slot, "">