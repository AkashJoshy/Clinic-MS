import type { VerifyDocumentDto } from "../../dto/admin.dto.ts";

export interface IVerifyDoctorDocumentUseCase {
  execute(data: VerifyDocumentDto): Promise<void>;
}
