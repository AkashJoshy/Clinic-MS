import type { Doctor } from "../../../domain/entities/doctor.entity.ts";
import type { IDepartmentRepository } from "../../../domain/repositories/i-department.repository.ts";
import type { IUserRepository } from "../../../domain/repositories/i-user.repository.ts";
import type {
  AdminDoctorFullInfoDto,
  AdminDoctorFullInfoResponseDto,
} from "../../dto/doctor.dto.ts";
import type { IAddressDetailsService } from "../../interfaces/services/shared/address/i-address-details.service.ts";
import type { IDepartmentDetailsService } from "../../interfaces/services/shared/i-department-details.service.ts";
import type { IDoctorClinicContextService } from "../../interfaces/services/doctor-clinic/i-doctor-clinic-context.service.ts";
import type { IDoctorDetailsService } from "../../interfaces/services/doctor/i-doctor-details.service.ts";
import { DoctorDetailsMapper } from "../../mappers/admin/doctors-details.mapper.ts";

export class DoctorDetailsService implements IDoctorDetailsService {
  constructor(
    private _userRepository: IUserRepository,
    private _departmentRepository: IDepartmentRepository,
    private _addressDetailsService: IAddressDetailsService,
    private _departmentDetailsService: IDepartmentDetailsService,
    private _doctorClinicContextService: IDoctorClinicContextService,
  ) {}

  async executeOne(doctor: Doctor): Promise<AdminDoctorFullInfoResponseDto> {
    const user = await this._userRepository.findById(doctor.userId!);

    const doctorClinicDetails =
      await this._doctorClinicContextService.executeOne(doctor.id!);

    const address = await this._addressDetailsService.executeOne(
      "Doctor",
      doctor.id!,
    );

    const department = doctor.departmentId
      ? await this._departmentRepository.findById(doctor.departmentId)
      : null;

    const response = DoctorDetailsMapper.toAdminDoctorFullInfo(
      doctor,
      user,
      doctorClinicDetails,
      address,
      department,
    );

    return response;
  }

  async executeMany(
    doctors: Doctor[],
  ): Promise<AdminDoctorFullInfoResponseDto[]> {
    const doctorIds = doctors.map((d) => d.id).filter((d) => d !== null);

    const doctorClinicDetails =
      await this._doctorClinicContextService.executeMany(doctorIds);

    const doctorClinicDetailsMap = new Map(
      doctorClinicDetails.map((dc) => [dc[0]?.doctorId, dc]),
    );
    const departmentIds = doctors
      .map((d) => d.departmentId)
      .filter((d) => d !== null);

    const { departmentMap } =
      await this._departmentDetailsService.executeMany(departmentIds);

    const userIds = doctors.map((d) => d.userId).filter((d) => d !== null);
    const users = await this._userRepository.findByIds("id", userIds);
    const userMap = new Map(users.map((u) => [u.id, u]));

    const { addressMap } = await this._addressDetailsService.executeMany(
      "Clinic",
      doctorIds,
    );

    const response: AdminDoctorFullInfoDto[] = doctors.map((doctor) => {
      const doctorClinicDetails = doctorClinicDetailsMap.get(doctor.id) ?? [];
      const user = userMap.get(doctor?.userId) ?? null;
      const doctorAddress = addressMap.get(doctor?.id ?? null) ?? null;
      const department = departmentMap.get(doctor.departmentId) ?? null;

      return DoctorDetailsMapper.toAdminDoctorFullInfo(
        doctor,
        user,
        doctorClinicDetails,
        doctorAddress,
        department,
      );
    });

    return response;
  }
}
