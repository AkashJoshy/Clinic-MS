import type { IDoctorClinicRepository } from "../../../../domain/repositories/i-doctor-clinic.repository.ts";
import type { IDoctorExistsService } from "../../../interfaces/services/doctor/i-doctor-exists.service.ts";
import type { IGenerateSlotsService } from "../../../interfaces/services/slot/i-generate-slots.service.ts";
import type { IGenerateSlotsUseCase } from "../../../interfaces/repositories/doctor/slot/i-generate-slots.usecase.ts";
import type {
  DoctorSlotsWithDateResponseDto,
  GenerateSlotsDto,
} from "../../../dto/doctor-clinic.dto.ts";

export class GenerateSlotsUseCase implements IGenerateSlotsUseCase {
  constructor(
    readonly _doctorClinicRepository: IDoctorClinicRepository,
    readonly _generateSlotsService: IGenerateSlotsService,
    readonly _doctorExistsService: IDoctorExistsService,
  ) {}

  async excute(
    data: GenerateSlotsDto,
  ): Promise<DoctorSlotsWithDateResponseDto> {
    const {
      clinicId,
      doctorClinicId,
      doctorId,
      exceptions,
      slotRules,
      weeklySchedule,
    } = data;

    await this._doctorExistsService.execute({
      doctorId,
      clinicId,
      doctorClinicId,
    });

    const doctorClinicDetailsToUpdate = {
      weeklySchedule,
      slotRules: slotRules,
      exceptions,
    };

    const generatedSlots = this._generateSlotsService.execute(
      doctorClinicDetailsToUpdate,
    );

    const updatedDoctorClinic =
      await this._doctorClinicRepository.findByIdAndUpdate(
        doctorClinicId,
        doctorClinicDetailsToUpdate,
      );

    const response: DoctorSlotsWithDateResponseDto = {
      clinicId,
      doctorClinicId,
      doctorId,
      generatedSlots,
      weeklySchedule: updatedDoctorClinic?.weeklySchedule ?? weeklySchedule,
      slotRules: updatedDoctorClinic?.slotRules ?? slotRules,
      exceptions: updatedDoctorClinic?.exceptions ?? exceptions,
    };

    return response;
  }
}
