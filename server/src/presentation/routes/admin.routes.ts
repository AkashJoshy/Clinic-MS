import { Router } from "express";
import { ADMIN_ENDPOINTS } from "../endpoints/admin.endpoints.js";
import { NodeMailerService } from "../../infrastructure/services/mail/NodeMailerService.ts";
import { authMiddleware } from "../middlewares/auth.middleware.ts";
import { authMiddleware2 } from "../middlewares/auth.middleware2.ts";
import { createDepartmentSchema, updateDepartmentSchema } from "../schemas/admin/department.schema.ts";
import { validate } from "../middlewares/validate.middleware.ts";
import { GetDepartmentController } from "../controllers/admin/get-department.controller.ts";
import { GetDepartmentUseCase } from "../../application/use-cases/admin/department-management/get-department.usecase.ts";
import { MongooseDepartmentRepository } from "../../infrastructure/repositories/mongoose-department.repository.ts";
import { AddDepartmentController } from "../controllers/admin/add-department.controller.ts";
import { AddDepartmentUseCase } from "../../application/use-cases/admin/department-management/add-department.usecase.ts";
import { EditDepartmentController } from "../controllers/admin/edit-department.controller.ts";
import { UpdateDepartmentStatusController } from "../controllers/admin/update-department-status.controller.ts";
import { EditDepartmentUseCase } from "../../application/use-cases/admin/department-management/edit-department.usecase.ts";
import { UpdateDepartmentStatusUseCase } from "../../application/use-cases/admin/department-management/update-department-status.usecase.ts";

const router = Router();

// DB Repo's
const mongooseDepartmentRepository = new MongooseDepartmentRepository();

// Services
const nodeMailerService = new NodeMailerService();

// Service-Usecase

// Use-cases
const getDepartmentUseCase = new GetDepartmentUseCase(
  mongooseDepartmentRepository,
);
const addDepartmentUseCase = new AddDepartmentUseCase(
  mongooseDepartmentRepository,
);
const editDepartmentUseCase = new EditDepartmentUseCase(
  mongooseDepartmentRepository,
);
const updateDepartmentStatusUseCase = new UpdateDepartmentStatusUseCase(
  mongooseDepartmentRepository,
);


// Controllers
const getDepartmentController = new GetDepartmentController(
  getDepartmentUseCase,
);
const addDepartmentController = new AddDepartmentController(
  addDepartmentUseCase,
);
const editDepartmentController = new EditDepartmentController(
  editDepartmentUseCase,
);
const updateDepartmentStatusController = new UpdateDepartmentStatusController(
  updateDepartmentStatusUseCase,
);

// Routes
router.get(
  ADMIN_ENDPOINTS["DEPARTMENT"],
  authMiddleware,
  authMiddleware2,
  async (req, res, next) => {
    await getDepartmentController.handle(req, res, next);
  },
);

router.post(
  ADMIN_ENDPOINTS["ADD_DEPARTMENT"],
  authMiddleware,
  authMiddleware2,
  validate(createDepartmentSchema),
  async (req, res, next) => {
    await addDepartmentController.handle(req, res, next);
  },
);

router.put(
  ADMIN_ENDPOINTS["DEPARTMENT"],
  authMiddleware,
  authMiddleware2,
  validate(createDepartmentSchema),
  async (req, res, next) => {
    await editDepartmentController.handle(req, res, next);
  },
);

router.patch(
  ADMIN_ENDPOINTS["DEPARTMENT"],
  authMiddleware,
  authMiddleware2,
  validate(updateDepartmentSchema),
  async (req, res, next) => {
    await updateDepartmentStatusController.handle(req, res, next);
  },
);

export default router;
