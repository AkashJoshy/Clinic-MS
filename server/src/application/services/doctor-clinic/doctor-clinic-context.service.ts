import type { IAddressDetailsService } from "../../interfaces/services/shared/address/i-address-details.service.ts";
import type { IClinicDetailsService } from "../../interfaces/services/clinic/i-clinic-details.service.ts";
import type { IDoctorClinicContextService } from "../../interfaces/services/doctor-clinic/i-doctor-clinic-context.service.ts";
import type { IDoctorClinicDetailsService } from "../../interfaces/services/doctor-clinic/i-doctor-clinic-details.service.ts";
import type {
  DoctorClinicContextDto,
  DoctorClinicContextResponseDto,
} from "../../dto/doctor-clinic.dto.ts";

export class DoctorClinicContextService implements IDoctorClinicContextService {
  constructor(
    private _addressDetailsService: IAddressDetailsService,
    private _clinicDetailsService: IClinicDetailsService,
    private _doctorClinicDetailsService: IDoctorClinicDetailsService,
  ) {}

  async executeOne(
    doctorId: string,
  ): Promise<DoctorClinicContextResponseDto[]> {
    const doctorClinic = await this._doctorClinicDetailsService.executeOne(
      doctorId!,
    );
    const clinicIds = doctorClinic
      .map((dc) => dc.clinicId)
      .filter((id) => id !== null);

    const { clinicMap } =
      await this._clinicDetailsService.executeMany(clinicIds);

    const { addressMap } = await this._addressDetailsService.executeMany(
      "Clinic",
      clinicIds,
    );

    const response: DoctorClinicContextResponseDto[] = doctorClinic.map(
      (dc) => {
        const clinic = clinicMap.get(dc.clinicId) ?? null;
        const address = addressMap.get(dc.clinicId) ?? null;

        return {
          ...dc,
          clinic,
          clinicAddress: address,
        };
      },
    );

    return response;
  }

  async executeMany(
    doctorIds: string[],
  ): Promise<DoctorClinicContextResponseDto[][]> {
    const { doctorClinicMap, doctorClinics } =
      await this._doctorClinicDetailsService.executeMany(doctorIds);

    const doctorClinicsArray = Array.from(doctorClinicMap.values());

    const clinicIds = [
      ...new Set(
        doctorClinics.map((dc) => dc.clinicId).filter((id) => id !== null),
      ),
    ];

    const { clinicMap } =
      await this._clinicDetailsService.executeMany(clinicIds);

    const { addressMap } = await this._addressDetailsService.executeMany(
      "Clinic",
      clinicIds,
    );

    const response: DoctorClinicContextDto[][] = doctorClinicsArray.map(
      (doctorClinic) => {
        const updatedDoctorClinic: DoctorClinicContextDto[] = doctorClinic.map(
          (dc) => {
            const clinic = clinicMap.get(dc.clinicId) ?? null;
            const clinicAddress = addressMap.get(dc.clinicId) ?? null;

            return {
              ...dc,
              clinic,
              clinicAddress,
            };
          },
        );

        return updatedDoctorClinic;
      },
    );

    return response;
  }
}
