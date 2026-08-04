import type { IPatientRepository } from "../../../../domain/repositories/IPatientRepository.ts";
import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IUpdatePatientProfileAddressUseCase } from "../../../repositories/patient/IUpdatePatientProfileAddress.UseCase.ts";
import type { UpdateAddressDto } from "../../../dto/shared.dto.ts";
import type { IAddressRepository } from "../../../../domain/repositories/IAddressRepository.ts";

export class UpdatePatientProfileAddressUseCase implements IUpdatePatientProfileAddressUseCase {
  constructor(
    private readonly _patientRepository: IPatientRepository,
    private readonly _addressRepository: IAddressRepository,
  ) {}

  async execute(data: UpdateAddressDto): Promise<boolean> {

    const patient = await this._patientRepository.findById(data.ownerId!)

    if (!patient || !patient.id) {
      throw new NotFoundError("Patient")
    }

    let address = await this._addressRepository.findOneBy({
      ownerId: data.ownerId
    })

    if (!address || !address.id) {
      throw new NotFoundError("Address")
    }

    const {
      addressLine,
      country,
      state,
      city,
      pincode
    } = data

    await this._addressRepository.findByIdAndUpdate(address.id, {
      addressLine,
      country,
      state,
      city,
      pincode
    })

    return true;
  }
}