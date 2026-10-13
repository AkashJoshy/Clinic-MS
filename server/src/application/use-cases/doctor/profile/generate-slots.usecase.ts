import type { IDoctorClinicRepository } from "../../../../domain/repositories/i-doctor-clinic.repository.ts";
import type {
  DoctorClinicSlotsWithDateDto,
} from "../../../dto/doctor-clinic.dto.ts";
import type { GenerateSlotsDto } from "../../../dto/doctor.dto.ts";
import type { IDoctorExistsService } from "../../../i-service/i-doctor-exists.service.ts";
import type { IGenerateSlotsService } from "../../../i-service/i-generate-slots.service.ts";
import type { IGenerateSlotsUseCase } from "../../../repositories/doctor/i-generate-slots.usecase.ts";

export class GenerateSlotsUseCase implements IGenerateSlotsUseCase {
  constructor(
    readonly _doctorClinicRepository: IDoctorClinicRepository,
    readonly _generateSlotsService: IGenerateSlotsService,
    readonly _doctorExistsService: IDoctorExistsService,
  ) {}

  async excute(data: GenerateSlotsDto): Promise<DoctorClinicSlotsWithDateDto> {
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

    const response: DoctorClinicSlotsWithDateDto = {
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
