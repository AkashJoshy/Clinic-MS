import type { EditDepartmentDto } from "../../../../dto/department.dto.ts";

export interface IEditDepartmentUseCase {
  execute(departmentData: EditDepartmentDto): Promise<void>;
}
