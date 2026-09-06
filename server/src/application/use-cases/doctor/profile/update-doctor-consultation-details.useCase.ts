import { DoctorClinic } from "../../../../domain/entities/doctor-clinic.entity.ts";
import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IClinicRepository } from "../../../../domain/repositories/i-clinic.repository.ts";
import type { IDoctorClinicRepository } from "../../../../domain/repositories/i-doctor-clinic.repository.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type { IUserRepository } from "../../../../domain/repositories/i-user.repository.ts";
import type { DoctorConsultationDetailsDto } from "../../../dto/doctor.dto.ts";
import type { IDoctorConsultationUseCase } from "../../../repositories/doctor/i-doctor-consultation.usecase.ts";

export class UpdateDoctorConsultationDetailsUseCase implements IDoctorConsultationUseCase {
  constructor(
    readonly _userRepository: IUserRepository,
    readonly _doctorRepository: IDoctorRepository,
    readonly _doctorClinicRepository: IDoctorClinicRepository,
    readonly _clinicRepository: IClinicRepository,
  ) {}

  async execute(
    data: DoctorConsultationDetailsDto,
  ): Promise<DoctorConsultationDetailsDto> {
    const { userId, id, clinicId, doctorId, ...consultationData } = data;

    const user = await this._userRepository.findById(userId);

    if (!user || !user.id || !id || !doctorId) {
      throw new NotFoundError("Doctor");
    }

    const doctor = await this._doctorRepository.findById(doctorId);

    if (!doctor || !doctor.id) {
      throw new NotFoundError("Doctor");
    }

    const doctorClinic = await this._doctorClinicRepository.findById(id);

    if (!doctorClinic || !doctorClinic.id) {
      throw new NotFoundError("Doctor");
    }

    if (doctorClinic.doctorId !== doctorId) {
      throw new NotFoundError("Doctor");
    }

    if (!clinicId) {
      throw new NotFoundError("Clinic");
    }

    const clinic = await this._clinicRepository.findById(clinicId);

    if (!clinic || !clinic.id) {
      throw new NotFoundError("Clinic");
    }

    if (doctorClinic.activeStatus() !== consultationData.isActive) {
      if (consultationData.isActive) {
        doctorClinic.activate();
      } else if (!consultationData.isActive) {
        doctorClinic.deactivate();
      }
    }

    doctorClinic.updateConsultationDetails(consultationData);

    const {
      id: doctorClinicId,
      doctorId: idOfDoctor,
      clinicId: idOfClinic,
      ...updatedDoctorClinic
    } = doctorClinic;

    await this._doctorClinicRepository.findByIdAndUpdate(
      doctorClinic.id,
      updatedDoctorClinic,
    );

    const response: DoctorConsultationDetailsDto = {
      id,
      userId,
      clinicId,
      doctorId,
      consultationFee: updatedDoctorClinic.consultationFee,
      isActive: updatedDoctorClinic.isActive,
      slotDuration: updatedDoctorClinic.slotDuration,
      timeZone: updatedDoctorClinic.timeZone,
      type: updatedDoctorClinic.type,
      updatedAt: doctor.updatedAt,
    };

    return response;
  }
}
