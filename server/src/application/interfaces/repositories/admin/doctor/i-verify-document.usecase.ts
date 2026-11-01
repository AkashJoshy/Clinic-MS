import type { VerifyDocumentDto } from "../../../../dto/admin.dto.ts";

export interface IVerifyDocumentUseCase {
  execute(data: VerifyDocumentDto): Promise<void>;
}
