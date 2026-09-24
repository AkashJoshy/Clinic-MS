import type { VerifyDocumentDto } from "../../dto/admin.dto.ts";

export interface IVerifyClinicDocumentUseCase {
  execute(data: VerifyDocumentDto): Promise<void>;
}
