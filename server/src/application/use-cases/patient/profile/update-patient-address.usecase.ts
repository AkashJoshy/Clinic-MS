import type { IPatientRepository } from "../../../../domain/repositories/i-patient.repository.ts";
import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IUpdateAddressUseCase } from "../../../repositories/patient/i-update-address.usecase.ts";
import type { UpdateAddressDto } from "../../../dto/shared.dto.ts";
import type { IAddressRepository } from "../../../../domain/repositories/i-address.repository.ts";

export class UpdatePatientAddressUseCase implements IUpdateAddressUseCase {
  constructor(
    private readonly _patientRepository: IPatientRepository,
    private readonly _addressRepository: IAddressRepository,
  ) {}

  async execute(data: UpdateAddressDto): Promise<UpdateAddressDto> {
    const patient = await this._patientRepository.findById(data.ownerId!);

    if (!patient || !patient.id) {
      throw new NotFoundError("Patient");
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
