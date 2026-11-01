import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IClinicRepository } from "../../../../domain/repositories/i-clinic.repository.ts";
import type { IDoctorClinicRepository } from "../../../../domain/repositories/i-doctor-clinic.repository.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type { ISlotRepository } from "../../../../domain/repositories/i-slot.repository.ts";
import type { SafeClinic } from "../../../dto/clinic.dto.ts";
import type { SafeDoctorClinic } from "../../../dto/doctor-clinic.dto.ts";
import type {
  DoctorCalendarSlot,
  GetDoctorCalendarDto,
  GetDoctorCalendarResponseDto,
} from "../../../dto/doctor-dashboard.dto.ts";
import type { IGetDoctorCalendarUseCase } from "../../../interfaces/repositories/doctor/dashboard/i-get-doctor-calendar.usecase.ts";
import type { IInitializeCalendarDateRangeUseCase } from "../../../interfaces/services/dashboard/doctor/i-initialize-calendar-date-range.service.ts";

export class GetDoctorCalendarUseCase implements IGetDoctorCalendarUseCase {
  constructor(
    private readonly _slotRepository: ISlotRepository,
    private readonly _doctorRepository: IDoctorRepository,
    private readonly _clinicRepository: IClinicRepository,
    private readonly _doctorClinicRepository: IDoctorClinicRepository,
    private readonly _initializeCalendarDateRangeService: IInitializeCalendarDateRangeUseCase,
  ) {}

  async execute(
    dto: GetDoctorCalendarDto,
  ): Promise<GetDoctorCalendarResponseDto> {
    const { userId, data } = dto;
    const { from, to } = data;

    const updatedFrom = new Date(from);
    updatedFrom.setDate(from.getDate() + 1);
    updatedFrom.setHours(0, 0, 0, 0);

    const doctor = await this._doctorRepository.findOneBy({ userId });

    if (!doctor || !doctor.id || !doctor.userId) {
      throw new NotFoundError("Doctor");
    }

    const slots = await this._slotRepository.findByDoctorIdAndDateRange(
      doctor.id,
      updatedFrom,
      to,
    );

    const clinicIds = slots
      .map((slot) => slot.clinicId)
      .filter((c) => c !== null);

    const doctorClinicIds = slots
      .map((slot) => slot.doctorClinicId)
      .filter((dc) => dc !== null);

    const clinics = await this._clinicRepository.findByIds("id", clinicIds);

    const doctorClinics = await this._doctorClinicRepository.findByIds(
      "id",
      doctorClinicIds,
    );

    const clinicsCount = clinics.length ?? 0;

    // const clinicsDuration = doctorClinics.map(dc => ({ [clinicMap.get(dc.clinicId)?.name]:  }))

    const clinicMap = new Map(clinics.map((c) => [c.id, c]));

    const doctorClinicMap = new Map(doctorClinics.map((dc) => [dc.id, dc]));

    const updatedSlotsMap =
      this._initializeCalendarDateRangeService.execute<DoctorCalendarSlot>({
        from: updatedFrom,
        to,
      });

    slots.forEach((slot) => {
      const {
        doctorClinicId,
        clinicId,
        createdAt: slotCreatedAt,
        ...rest
      } = slot;
      const dc = doctorClinicMap.get(slot.doctorClinicId) ?? null;
      const c = clinicMap.get(slot.clinicId) ?? null;

      const {
        clinicId: _clinicId,
        doctorId,
        weeklySchedule,
        slotRules,
        exceptions,
        updatedAt,
        createdAt,
        ...restDoctorClinic
      } = dc as SafeDoctorClinic;

      const {
        registrationNumber,
        establishmentLicenceDoc,
        registrationDoc,
        about,
        altPhone,
        createdAt: clinicCreatedAt,
        updatedAt: clinicUpdatedAt,
        location,
        ...restClinic
      } = c as SafeClinic;

      const dateKey = new Date(rest.date).toISOString().slice(0, 10);

      updatedSlotsMap.get(dateKey)!.push({
        ...rest,
        clinicDetails: restClinic,
        doctorClinicDetails: restDoctorClinic,
      });
    });

    // updatedSlotsMap.forEach((slot) => {
    //   console.log(slot);
    // });

    return {
      slots: Object.fromEntries(updatedSlotsMap),
      clinicsCount,
    };
  }
}
