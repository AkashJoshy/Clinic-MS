import { Slot } from "../../../../domain/entities/slot.entity.ts";
import type { ISlotRepository } from "../../../../domain/repositories/i-slot.repository.ts";
import type { ConfirmSlotsDto } from "../../../dto/doctor-clinic.dto.ts";
import type { IDoctorExistsService } from "../../../interfaces/services/doctor/i-doctor-exists.service.ts";
import type { IConfirmSlotsUseCase } from "../../../interfaces/repositories/doctor/slot/i-confirm-slots.usecase.ts";
import type { IDoctorSubscriptionRepository } from "../../../../domain/repositories/i-doctor-subscription.repository.ts";
import { DoctorSubscription } from "../../../../domain/entities/doctor-subscription.entity.ts";

export class ConfirmSlotsUseCase implements IConfirmSlotsUseCase {
  constructor(
    private readonly _doctorExistsService: IDoctorExistsService,
    private readonly _slotRepository: ISlotRepository,
    private readonly _doctorSubscriptionRepository: IDoctorSubscriptionRepository
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

    // heldBy: null,
    // holdExpiresAt: null,

    console.log(`Confirmed Slots: `);
    console.log(confirmedSlots);

    confirmedSlots.forEach(async (slot) => {
      await this._slotRepository.save(slot);
    });
  }
}
