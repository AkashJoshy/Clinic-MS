import { GetAllDepartmentsUseCase } from "../../application/use-cases/get-all-departments.usecase.ts";
import { GetAllDepartmentsController } from "../../presentation/controllers/get-all-departments.controller.ts";
import { mongooseDepartmentRepository } from "../index.ts";

// Use-cases
const getAllDepartmentsUseCase = new GetAllDepartmentsUseCase(
  mongooseDepartmentRepository,
);

// Controllers
export const getAllDepartmentsController = new GetAllDepartmentsController(
  getAllDepartmentsUseCase,
);
