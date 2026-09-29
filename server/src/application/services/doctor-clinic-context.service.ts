import type { DoctorClinicContextDto } from "../dto/shared.dto.ts";
import type { IAddressDetailsService } from "../i-service/i-address-details.service.ts";
import type { IClinicDetailsService } from "../i-service/i-clinic-details.service.ts";
import type { IDoctorClinicContextService } from "../i-service/i-doctor-clinic-context.service.ts";
import type { IDoctorClinicDetailsService } from "../i-service/i-doctor-clinic-details.service.ts";

export class DoctorClinicContextService implements IDoctorClinicContextService {
  constructor(
    private _addressDetailsService: IAddressDetailsService,
    private _clinicDetailsService: IClinicDetailsService,
    private _doctorClinicDetailsService: IDoctorClinicDetailsService,
  ) {}

  async executeOne(doctorId: string): Promise<DoctorClinicContextDto[]> {
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

    const response: DoctorClinicContextDto[] = doctorClinic.map((dc) => {
      const clinic = clinicMap.get(dc.clinicId) ?? null;
      const address = addressMap.get(dc.clinicId) ?? null;

      return {
        ...dc,
        clinic,
        clinicAddress: address,
      };
    });

    return response;
  }

  async executeMany(doctorIds: string[]): Promise<DoctorClinicContextDto[][]> {
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
