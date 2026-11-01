import type { VerifyDocumentDto } from "../../../dto/admin.dto.ts";
import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type { DoctorDocumentField } from "../../../../domain/types/admin.types.ts";
import type { IVerifyDocumentUseCase } from "../../../interfaces/repositories/admin/doctor/i-verify-document.usecase.ts";

export class VerifyDoctorDocumentUseCase implements IVerifyDocumentUseCase {
  constructor(private readonly _doctorRepository: IDoctorRepository) {}

  async execute(data: VerifyDocumentDto): Promise<void> {
    const { id, action, documentField, url } = data;
    const doctor = await this._doctorRepository.findById(id);

    if (!doctor || !doctor.id) {
      throw new NotFoundError("Doctor");
    }

    if (action === "VERIFY") {
      doctor.verifyDocument(documentField as DoctorDocumentField, url);
    } else if (action === "REJECT") {
      doctor.rejectDocument(documentField as DoctorDocumentField, url);
    }
    const fieldToUpdate = doctor[documentField as DoctorDocumentField];

    await this._doctorRepository.findByIdAndUpdate(doctor.id, {
      [documentField]: fieldToUpdate,
    });
  }
}
