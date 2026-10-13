import { Slot } from "../../../../domain/entities/slot.entity.ts";
import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IDoctorClinicRepository } from "../../../../domain/repositories/i-doctor-clinic.repository.ts";
import type { ISlotRepository } from "../../../../domain/repositories/i-slot.repository.ts";
import type { ConfirmSlotsDto } from "../../../dto/doctor-clinic.dto.ts";
import type { IDoctorExistsService } from "../../../i-service/i-doctor-exists.service.ts";
import type { IConfirmSlotsUseCase } from "../../../repositories/doctor/i-confirm-slots.usecase.ts";

export class ConfirmSlotsUseCase implements IConfirmSlotsUseCase {
  constructor(
    readonly _doctorClinicRepository: IDoctorClinicRepository,
    readonly _doctorExistsService: IDoctorExistsService,
    readonly _slotRepository: ISlotRepository,
  ) {}

  async execute(data: ConfirmSlotsDto): Promise<void> {
    const { doctorId, clinicId, doctorClinicId, generatedSlots } = data;
    await this._doctorExistsService.execute({
      doctorId,
      clinicId,
      doctorClinicId,
    });

    const confirmedSlots = generatedSlots.flatMap((gs) =>
      gs.slots.map((slot) =>
        Slot.createAvailable({
          id: null,
          doctorId,
          clinicId,
          doctorClinicId,
          date: new Date(gs.date),
          mode: slot.mode,
          startTime: slot.startTime,
          endTime: slot.endTime,
          createdAt: null,
          updatedAt: null,
        }),
      ),
    );

    console.log(`Confirmed Slots: `);
    console.log(confirmedSlots);

    confirmedSlots.forEach(async (slot) => {
      await this._slotRepository.save(slot);
    });
  }
}
