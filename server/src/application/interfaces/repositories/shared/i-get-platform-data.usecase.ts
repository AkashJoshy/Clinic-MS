import type { PlatformDataResponseDto } from "../../../dto/shared.dto.ts";

export interface IGetPlatformDataUseCase {
  execute(): Promise<PlatformDataResponseDto>;
}
