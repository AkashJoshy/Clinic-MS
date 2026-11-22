import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IUpdateAddressUseCase } from "../../../interfaces/repositories/shared/i-update-address.usecase.ts";
import type { UpdateAddressDto } from "../../../dto/shared.dto.ts";
import type { IAddressRepository } from "../../../../domain/repositories/i-address.repository.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type { IClinicRepository } from "../../../../domain/repositories/i-clinic.repository.ts";
import type { IDoctorClinicRepository } from "../../../../domain/repositories/i-doctor-clinic.repository.ts";

export class UpdateDoctorAddressUseCase implements IUpdateAddressUseCase {
  constructor(
    private readonly _doctorRepository: IDoctorRepository,
    private readonly _clinicRepository: IClinicRepository,
    private readonly _doctorClinicRepository: IDoctorClinicRepository,
    private readonly _addressRepository: IAddressRepository,
  ) {}

  async execute(data: UpdateAddressDto): Promise<UpdateAddressDto> {
    const clinic = await this._clinicRepository.findById(data.ownerId!);

    if (!clinic || !clinic.id) {
      throw new NotFoundError("Clinic");
    }

    const doctorClinic = await this._doctorClinicRepository.findOneBy({
      clinicId: clinic.id,
    });

    if (
      !doctorClinic ||
      !doctorClinic.id ||
      !doctorClinic.clinicId ||
      !doctorClinic.doctorId
    ) {
      throw new NotFoundError("Doctor clinic");
    }

    const doctor = await this._doctorRepository.findById(doctorClinic.doctorId);

    if (!doctor || !doctor.id) {
      throw new NotFoundError("Doctor");
    }

    let address = await this._addressRepository.findOneBy({
      ownerId: data.ownerId,
    });

    if (!address || !address.id) {
      throw new NotFoundError("Address");
    }

    const { addressLine, country, state, city, pincode } = data;

    const updatedAddress = await this._addressRepository.findByIdAndUpdate(
      address.id,
      {
        addressLine,
        country,
        state,
        city,
        pincode,
      },
    );

    if (!updatedAddress || !updatedAddress.id) {
      throw new NotFoundError("Address");
    }

    const { id, createdAt, updatedAt, ownerType, ...updatedData } =
      updatedAddress;

    return updatedData;
  }
}
