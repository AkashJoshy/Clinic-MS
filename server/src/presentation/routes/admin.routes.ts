import { Router } from "express";
import { ADMIN_ENDPOINTS } from "../endpoints/admin.endpoints.js";
import { authenticateUser } from "../middlewares/authenticate-user.middleware.ts";
import { authorizeUser } from "../middlewares/authorize-user.middleware.ts";
import {
  createDepartmentSchema,
  subscriptionSchema,
  updateDepartmentSchema,
} from "../schemas/admin/admin.schema.ts";
import { validate } from "../middlewares/validate.middleware.ts";
import { updateUserSchema } from "../schemas/shared/shared.schema.ts";
import {
  adminDashboardController,
  adminDepartmentController,
  adminDoctorController,
  adminPatientController,
  adminSubscriptionPlanController,
  colorPaletteController,
  platformSettingsController,
} from "../../container/index.ts";
import { validateAdminAccess } from "../middlewares/validate-admin-access.middleware.ts";

const router = Router();

// Routes
router.get(
  ADMIN_ENDPOINTS["DEPARTMENTS"]["FETCH_ONE"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) =>
    await adminDepartmentController.getDepartment(req, res, next),
);

router.post(
  ADMIN_ENDPOINTS["DEPARTMENTS"]["ADD_ONE"],
  authenticateUser,
  authorizeUser,
  validate(createDepartmentSchema),
  async (req, res, next) =>
    await adminDepartmentController.addDepartment(req, res, next),
);

router.put(
  ADMIN_ENDPOINTS["DEPARTMENTS"]["BASE"],
  authenticateUser,
  authorizeUser,
  validate(createDepartmentSchema),
  async (req, res, next) =>
    await adminDepartmentController.editDepartment(req, res, next),
);

router.patch(
  ADMIN_ENDPOINTS["DEPARTMENTS"]["UPDATE_ONE"],
  authenticateUser,
  authorizeUser,
  validate(updateDepartmentSchema),
  async (req, res, next) => {
    await adminDepartmentController.updateDepartment(req, res, next);
  },
);

router.get(
  ADMIN_ENDPOINTS["DOCTORS"]["FETCH_ONE"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) =>
    await adminDoctorController.getDoctor(req, res, next),
);

router.get(
  ADMIN_ENDPOINTS["DOCTORS"]["FETCH_ALL"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) =>
    await adminDoctorController.getAllDoctors(req, res, next),
);

router.patch(
  ADMIN_ENDPOINTS["DOCTORS"]["APPROVE_ONE"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) =>
    await adminDoctorController.approveDoctor(req, res, next),
);

router.patch(
  ADMIN_ENDPOINTS["DOCTORS"]["REJECT_ONE"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) =>
    await adminDoctorController.rejectDoctor(req, res, next),
);

router.patch(
  ADMIN_ENDPOINTS["DOCTORS"]["UPDATE_ONE"],
  authenticateUser,
  authorizeUser,
  validate(updateUserSchema),
  async (req, res, next) =>
    await adminDoctorController.updateDoctor(req, res, next),
);

router.patch(
  ADMIN_ENDPOINTS["DOCTORS"]["VERIFY"]["DOCTOR_DOC"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) => {
    await adminDoctorController.verifyDoctorDocument(req, res, next);
  },
);

router.patch(
  ADMIN_ENDPOINTS["DOCTORS"]["VERIFY"]["CLINIC_DOC"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) =>
    await adminDoctorController.verifyClinicDocument(req, res, next),
);

router.get(
  ADMIN_ENDPOINTS["PATIENTS"]["FETCH_ONE"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) =>
    await adminPatientController.getPatient(req, res, next),
);

router.get(
  ADMIN_ENDPOINTS["PATIENTS"]["FETCH_ALL"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) =>
    await adminPatientController.getAllPatients(req, res, next),
);

router.patch(
  ADMIN_ENDPOINTS["PATIENTS"]["UPDATE_ONE"],
  authenticateUser,
  authorizeUser,
  validate(updateUserSchema),
  async (req, res, next) =>
    await adminPatientController.updatePatientStatus(req, res, next),
);

router.get(
  ADMIN_ENDPOINTS["SUBSCRIPTION"]["FETCH_ALL"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) =>
    await adminSubscriptionPlanController.getAllSubscriptionPlans(
      req,
      res,
      next,
    ),
);

router.post(
  ADMIN_ENDPOINTS["SUBSCRIPTION"]["ADD_ONE"],
  authenticateUser,
  authorizeUser,
  validate(subscriptionSchema),
  async (req, res, next) =>
    await adminSubscriptionPlanController.createNewSubscriptionPlan(
      req,
      res,
      next,
    ),
);

router.patch(
  ADMIN_ENDPOINTS["SUBSCRIPTION"]["UPDATE_ONE"],
  authenticateUser,
  authorizeUser,
  validate(subscriptionSchema),
  async (req, res, next) =>
    await adminSubscriptionPlanController.editSubscriptionPlan(req, res, next),
);

router.patch(
  ADMIN_ENDPOINTS["SUBSCRIPTION"]["UPDATE_STATUS"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) =>
    await adminSubscriptionPlanController.updateSubscriptionPlanStatus(
      req,
      res,
      next,
    ),
);

router.get(
  ADMIN_ENDPOINTS["PLATFORM_SETTINGS"]["FETCH"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) =>
    await platformSettingsController.getPlatformSettings(req, res, next),
);

router.patch(
  ADMIN_ENDPOINTS["PLATFORM_SETTINGS"]["UPDATE"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) =>
    await platformSettingsController.updatePlatformSettings(req, res, next),
);

router.get(
  ADMIN_ENDPOINTS["PLATFORM_SETTINGS"]["FETCH"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) =>
    await platformSettingsController.getPlatformSettings(req, res, next),
);

router.post(
  ADMIN_ENDPOINTS["COLOR_PALETTE"]["BASE"],
  authenticateUser,
  authorizeUser,
  validateAdminAccess,
  async (req, res, next) => await colorPaletteController.create(req, res, next),
);

router.get(
  ADMIN_ENDPOINTS["COLOR_PALETTE"]["FETCH"]["FETCH_ALL"],
  authenticateUser,
  authorizeUser,
  validateAdminAccess,
  async (req, res, next) => await colorPaletteController.getAll(req, res, next),
);

router.get(
  ADMIN_ENDPOINTS["COLOR_PALETTE"]["FETCH"]["FETCH_ONE"],
  authenticateUser,
  authorizeUser,
  validateAdminAccess,
  async (req, res, next) => await colorPaletteController.getOne(req, res, next),
);

router.patch(
  ADMIN_ENDPOINTS["COLOR_PALETTE"]["UPDATE"]["UPDATE_ONE"],
  authenticateUser,
  authorizeUser,
  validateAdminAccess,
  async (req, res, next) => await colorPaletteController.edit(req, res, next),
);

router.patch(
  ADMIN_ENDPOINTS["COLOR_PALETTE"]["UPDATE"]["TOGGLE_STATUS"],
  authenticateUser,
  authorizeUser,
  validateAdminAccess,
  async (req, res, next) => {
     await colorPaletteController.toggleStatus(req, res, next)
  },
);

router.get(
  ADMIN_ENDPOINTS["DASHBOARD"]["DEPARTMENT_DISTRIBUTION"],
  authenticateUser,
  authorizeUser,
  validateAdminAccess,
  async (req, res, next) => {
     await adminDashboardController.getDepartmentDistribution(req, res, next)
  },
);

router.get(
  ADMIN_ENDPOINTS["DASHBOARD"]["DASHBOARD_STATS"],
  authenticateUser,
  authorizeUser,
  validateAdminAccess,
  async (req, res, next) => {
     await adminDashboardController.getDashboardStats(req, res, next)
  },
);

export default router;
