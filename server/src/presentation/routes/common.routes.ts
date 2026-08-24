import { Router } from "express";
import { COMMON_ENDPOINTS } from "../endpoints/common.endpoints.ts";
import { DepartmentRepository } from "../../infrastructure/repositories/department.repository.ts";
import { GetAllDepartmentsController } from "../controllers/get-all-departments.controller.ts";
import { GetAllDepartmentsUseCase } from "../../application/use-cases/get-all-departments.usecase.ts";

const router = Router();

// DB Repo's
const mongooseDepartmentRepository = new DepartmentRepository();

// Services

// Service-Usecase

// Use-cases
const getAllDepartmentsUseCase = new GetAllDepartmentsUseCase(
  mongooseDepartmentRepository,
);

// Controllers
const getAllDepartmentsController = new GetAllDepartmentsController(
  getAllDepartmentsUseCase,
);

router.get(COMMON_ENDPOINTS["FETCH_DEPARTMENTS"], async (req, res, next) => {
  await getAllDepartmentsController.handle(req, res, next);
});

export default router;
