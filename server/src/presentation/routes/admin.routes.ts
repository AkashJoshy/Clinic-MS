import { Router } from "express";
import { ADMIN_ENDPOINTS } from "../endpoints/admin.endpoints.js";
import { authenticateUser } from "../middlewares/authenticate-user.middleware.ts";
import { authorizeUser } from "../middlewares/authorize-user.middleware.ts";
import {
  createDepartmentSchema,
  updateDepartmentSchema,
} from "../schemas/admin/admin.schema.ts";
import { validate } from "../middlewares/validate.middleware.ts";
import { updateUserSchema } from "../schemas/shared/shared.schema.ts";
import { addDepartmentController, approveDoctorController, editDepartmentController, getAllDoctorsController, getAllPatientsController, getDepartmentController, getDoctorController, getPatientController, rejectDoctorController, updateDepartmentStatusController, updateDoctorStatusController, updatePatientStatusController } from "../../container/index.ts";

const router = Router();

// Routes
router.get(
  ADMIN_ENDPOINTS["FETCH_DEPARTMENT"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) => {
    await getDepartmentController.handle(req, res, next);
  },
);

router.post(
  ADMIN_ENDPOINTS["ADD_DEPARTMENT"],
  authenticateUser,
  authorizeUser,
  validate(createDepartmentSchema),
  async (req, res, next) => {
    await addDepartmentController.handle(req, res, next);
  },
);

router.put(
  ADMIN_ENDPOINTS["FETCH_DEPARTMENT"],
  authenticateUser,
  authorizeUser,
  validate(createDepartmentSchema),
  async (req, res, next) => {
    await editDepartmentController.handle(req, res, next);
  },
);

router.patch(
  ADMIN_ENDPOINTS["FETCH_DEPARTMENT"],
  authenticateUser,
  authorizeUser,
  validate(updateDepartmentSchema),
  async (req, res, next) => {
    await updateDepartmentStatusController.handle(req, res, next);
  },
);

router.get(
  ADMIN_ENDPOINTS["FETCH_DOCTORS"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) => {
    await getAllDoctorsController.handle(req, res, next);
  },
);

router.get(
  ADMIN_ENDPOINTS["FETCH_DOCTOR"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) => {
    await getDoctorController.handle(req, res, next);
  },
);

router.get(
  ADMIN_ENDPOINTS["FETCH_PATIENTS"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) => {
    await getAllPatientsController.handle(req, res, next);
  },
);

router.get(
  ADMIN_ENDPOINTS["FETCH_PATIENT"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) => {
    await getPatientController.handle(req, res, next);
  },
);

router.patch(
  ADMIN_ENDPOINTS["APPROVE_DOCTOR"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) => {
    await approveDoctorController.handle(req, res, next);
  },
);

router.delete(
  ADMIN_ENDPOINTS["REJECT_DOCTOR"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) => {
    await rejectDoctorController.handle(req, res, next);
  },
);

router.patch(
  ADMIN_ENDPOINTS["UPDATE_PATIENT"],
  authenticateUser,
  authorizeUser,
  validate(updateUserSchema),
  async (req, res, next) => {
    await updatePatientStatusController.handle(req, res, next);
  },
);

router.patch(
  ADMIN_ENDPOINTS["UPDATE_DOCTOR"],
  authenticateUser,
  authorizeUser,
  validate(updateUserSchema),
  async (req, res, next) => {
    await updateDoctorStatusController.handle(req, res, next);
  },
);

export default router;
