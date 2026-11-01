import type { CreateDepartmentDto } from "../../../../dto/department.dto.ts";

export interface IAddDepartmentUseCase {
  execute(data: CreateDepartmentDto): Promise<void>;
}
