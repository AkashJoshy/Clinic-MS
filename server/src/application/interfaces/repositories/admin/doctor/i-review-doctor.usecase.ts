import type { ReviewDoctorUpdateDto } from "../../../../dto/doctor.dto.ts";

export interface IReviewDoctorUseCase {
  execute(data: ReviewDoctorUpdateDto): Promise<void>;
}
