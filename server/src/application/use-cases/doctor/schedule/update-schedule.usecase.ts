import mongoose from "mongoose";
import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IDoctorClinicRepository } from "../../../../domain/repositories/i-doctor-clinic.repository.ts";
import type {
  DoctorScheduleResponseDto,
  UpdateScheduleDto,
} from "../../../dto/doctor-clinic.dto.ts";
import type { IUpdateScheduleUseCase } from "../../../interfaces/repositories/doctor/schedule/i-update-schedule.usecase.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type { IClinicRepository } from "../../../../domain/repositories/i-clinic.repository.ts";

export class UpdateScheduleUseCase implements IUpdateScheduleUseCase {
  constructor(
    private readonly _doctorClinicRepository: IDoctorClinicRepository,
    private readonly _doctorRepository: IDoctorRepository,
    private readonly _clinicRepository: IClinicRepository,
  ) {}

  async execute(data: UpdateScheduleDto): Promise<DoctorScheduleResponseDto> {
    const {
      doctorClinicId,
      doctorId,
      clinicId,
      weeklySchedule,
      slotRules,
      exceptions,
    } = data;

    if (!doctorClinicId) {
      throw new NotFoundError("Doctor Clinic");
    }

    const doctorClinic =
      await this._doctorClinicRepository.findById(doctorClinicId);

    if (
      !doctorClinic ||
      !doctorClinic.id ||
      !doctorClinic.doctorId ||
      !doctorClinic.clinicId
    ) {
      throw new NotFoundError("Doctor Clinic");
    }

    const doctor = await this._doctorRepository.findById(doctorClinic.doctorId);

    if (!doctor || !doctor.id) throw new NotFoundError("Doctor");

    const clinic = await this._clinicRepository.findById(doctorClinic.clinicId);

    if (!clinic || !clinic.id) throw new NotFoundError("Clinic");

    doctorClinic.updateSchedule(weeklySchedule);
    doctorClinic.updateSlotRules(slotRules);
    doctorClinic.updateExceptions(exceptions);

    const updatedDoctorClinic =
      await this._doctorClinicRepository.findByIdAndUpdate(doctorClinicId, {
        weeklySchedule: doctorClinic.weeklySchedule,
        slotRules: doctorClinic.slotRules,
        exceptions: doctorClinic.exceptions,
      });

    return {
      doctorId: updatedDoctorClinic?.doctorId ?? doctorId,
      clinicId: updatedDoctorClinic?.clinicId ?? clinicId,
      doctorClinicId: updatedDoctorClinic?.id ?? doctorClinicId,
      weeklySchedule: updatedDoctorClinic?.weeklySchedule ?? weeklySchedule,
      slotRules: updatedDoctorClinic?.slotRules ?? slotRules,
      exceptions: updatedDoctorClinic?.exceptions ?? exceptions,
    };
  }
}
