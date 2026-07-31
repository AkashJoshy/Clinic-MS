import type { CreateDepartmentDto } from "../../dto/admin.dto.ts";

export interface IAddDepartmentUseCase {
  execute(data: CreateDepartmentDto): Promise<void>;
}