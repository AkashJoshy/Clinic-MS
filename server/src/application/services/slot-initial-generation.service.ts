import Slot from "../../domain/entities/Slot.ts";
import { NotFoundError } from "../../domain/errors/not-found.error.ts";
import type { IDoctorClinicRepository } from "../../domain/repositories/IDoctorClinicRepository.ts";
import type { ISlotRepository } from "../../domain/repositories/ISlotRepository.ts";
import type { SlotGenerationService } from "./slot-generation.service.ts";

export class SlotInitialGenerationService {
  constructor(
    private _doctorClinicRepository: IDoctorClinicRepository,
    private _slotRepository: ISlotRepository,
    private _slotGenerateService: SlotGenerationService,
  ) {}

  async execute(doctorId: string): Promise<void> {
    const doctorClinic = await this._doctorClinicRepository.findOneBy(doctorId);

    if (!doctorClinic) {
      throw new NotFoundError("Doctor not found");
    }

    const now = new Date();
    let workingDaysGenerated = 0;

    for (let i = 0; workingDaysGenerated < 7; i++) {
      const date = new Date(now);
      date.setDate(now.getDate() + i);
      date.setUTCHours(0, 0, 0, 0);

      const dayName = this._slotGenerateService.getDayName(date.getDay());
      const schedule = doctorClinic.schedule.find(
        (s) => s.dayOfWeek === dayName,
      );

      if (!schedule) continue;

      workingDaysGenerated++;

      const existingSlots = await this._slotRepository.findBy({
        doctorClinicId: doctorClinic.id!,
        date: date,
      });

      if (existingSlots.length === 0) {
        console.log(
          `[SlotGenerator] Generating slots for DoctorClinic ${doctorClinic.id} on ${date.toDateString()} [${workingDaysGenerated}/7]`,
        );

        for (const session of schedule.sessions) {
          const slot = Slot.createAvailable({
            id: null,
            doctorClinicId: doctorClinic.id!,
            patientId: null,
            date: date,
            startTime: session.startTime,
            endTime: session.endTime,
            type: session.type,
            heldBy: null,
            holdExpiresAt: null,
          });

          if (slot) await this._slotRepository.save(slot);
        }
      }
    }
  }
}
