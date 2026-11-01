import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IClinicRepository } from "../../../../domain/repositories/i-clinic.repository.ts";
import type { IDoctorClinicRepository } from "../../../../domain/repositories/i-doctor-clinic.repository.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type { ISlotRepository } from "../../../../domain/repositories/i-slot.repository.ts";
import type { DoctorDashboardOverviewResponseDto } from "../../../dto/doctor-dashboard.dto.ts";
import type { IGetDoctorDashboardOverviewUseCase } from "../../../interfaces/repositories/doctor/dashboard/i-get-doctor-dashboard-overview.use-case.ts";

export class GetDoctorDashboardOverviewUseCase implements IGetDoctorDashboardOverviewUseCase {
  constructor(
    private readonly _doctorRepository: IDoctorRepository,
    private readonly _slotRepository: ISlotRepository,
    private readonly _clinicRepository: IClinicRepository,
    private readonly _doctorClinicRepository: IDoctorClinicRepository,
  ) {}

  async execute(userId: string): Promise<DoctorDashboardOverviewResponseDto> {
    if (!userId) {
      throw new NotFoundError("Doctor");
    }

    const doctor = await this._doctorRepository.findOneBy({ userId });

    if (!doctor || !doctor.id || !doctor.userId) {
      throw new NotFoundError("Doctor");
    }

    const slots = await this._slotRepository.findByDoctorIdForToday(doctor.id);

    return {
      appointments: {
        today: {
          total: 8,
          completed: 5,
          upcoming: 2,
          cancelled: 1,
        },
        overall: {
          total: 156,
          completed: 120,
          cancelled: 12,
        },
      },
      schedule: {
        today: {
          totalSlots: slots.length,
          availableSlots: slots.filter((slot) => slot.status === "AVAILABLE")
            .length,
          bookedSlots: slots.filter((slot) => slot.status === "BOOKED").length,
        },
      },
      earnings: {
        total: 125000,
        today: 4500,
        thisMonth: 38500,
      },
      recentAppointments: [],
    };
  }
}
