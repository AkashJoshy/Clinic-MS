import type { IPatientRepository } from "../../../../domain/repositories/i-patient.repository.ts";
import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IUpdateEmergencyContactUseCase } from "../../../repositories/patient/i-update-emergency-contact.usecase.ts";
import type { UpdateEmergencyContactDto } from "../../../dto/patient.dto.ts";

export class UpdatePatientEmergencyContactUseCase implements IUpdateEmergencyContactUseCase {
  constructor(private readonly _patientRepository: IPatientRepository) {}

  async execute(
    data: UpdateEmergencyContactDto,
  ): Promise<UpdateEmergencyContactDto> {
    const { id, ...emergencyData } = data;
    const patient = await this._patientRepository.findById(data.id);

    if (!patient || !patient.id) {
      throw new NotFoundError("Patient");
    }

    patient.updateEmergencyContact(emergencyData);

    await this._patientRepository.findByIdAndUpdate(patient.id, {
      emergencyContact: patient.emergencyContact!,
    });

    return {
      id: patient.id,
      name: patient.emergencyContact?.name ?? "",
      phone: patient.emergencyContact?.phone ?? "",
      relationship: patient.emergencyContact?.relationship!,
    };
  }
}
