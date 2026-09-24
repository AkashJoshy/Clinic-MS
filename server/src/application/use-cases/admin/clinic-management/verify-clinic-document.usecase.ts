import type { VerifyDocumentDto } from "../../../dto/admin.dto.ts";
import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IClinicRepository } from "../../../../domain/repositories/i-clinic.repository.ts";
import type { IVerifyClinicDocumentUseCase } from "../../../repositories/admin/i-verify-clinic-document.usecase.ts";
import type { ClinicDocumentField } from "../../../../domain/types/admin.types.ts";

export class VerifyClinicDocumentUseCase implements IVerifyClinicDocumentUseCase {
  constructor(private readonly _clinicRepository: IClinicRepository) {}

  async execute(data: VerifyDocumentDto): Promise<void> {
    const { id, action, documentField, url } = data;
    const clinic = await this._clinicRepository.findById(data.id);

    if (!clinic || !clinic.id) {
      throw new NotFoundError("Clinic");
    }

    if (action === "VERIFY") {
      clinic.verifyDocument(documentField as ClinicDocumentField, url);
    } else if (action === "REJECT") {
      clinic.rejectDocument(documentField as ClinicDocumentField, url);
    }
    const fieldToUpdate = clinic[documentField as ClinicDocumentField];

    await this._clinicRepository.findByIdAndUpdate(clinic.id, {
      [documentField]: fieldToUpdate,
    });
  }
}
