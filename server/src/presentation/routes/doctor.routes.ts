import { Router } from "express";
import { DOCTOR_ENDPOINTS } from "../endpoints/doctor.endpoints.ts";
import { authenticateUser } from "../middlewares/authenticate-user.middleware.ts";
import { authorizeUser } from "../middlewares/authorize-user.middleware.ts";
import { validate } from "../middlewares/validate.middleware.ts";
import {
  doctorUpload,
  profileupload,
} from "../middlewares/upload.middleware.ts";
import {
  doctorRegistrationSchema,
  consultationDetailsSchema,
  professionalDetailsSchema,
} from "../schemas/doctor/doctor.schema.ts";
import { validateFile } from "../middlewares/validate-file.middleware.ts";
import { updatePersonalProfilePictureSchema } from "../schemas/shared/shared.schema.ts";
import { generateSlotsSchema } from "../schemas/doctor/generate-slots.schema.ts";
import { confirmedSlotsSchema } from "../schemas/doctor/confirm-slots.schema.ts";
import {
  doctorController,
  doctorDashboardController,
  doctorReapplicationController,
  doctorSlotController,
  doctorSubscriptionController,
} from "../../container/modules/doctor.modules.ts";

const router = Router();

// Routes
router.get(
  DOCTOR_ENDPOINTS["PROFILE"]["FETCH_ONE"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) => {
    await doctorController.getProfile(req, res, next);
  },
);

router.get(
  DOCTOR_ENDPOINTS["REAPPLICATIONS"]["FETCH_ONE"],
  async (req, res, next) => {
    await doctorReapplicationController.getReapplication(req, res, next);
  },
);

router.patch(
  DOCTOR_ENDPOINTS["REAPPLICATIONS"]["UPDATE_ONE"],
  doctorUpload,
  // validate(doctorRegistrationSchema),
  async (req, res, next) => {
    await doctorReapplicationController.updateReapplication(req, res, next);
  },
);

router.put(
  DOCTOR_ENDPOINTS["PROFESSIONAL_DETAILS"]["UPDATE_ONE"],
  authenticateUser,
  authorizeUser,
  validate(professionalDetailsSchema),
  async (req, res, next) => {
    await doctorController.updateProfessionalDetails(req, res, next);
  },
);

router.put(
  DOCTOR_ENDPOINTS["CONSULTATION_DETAILS"]["UPDATE_ONE"],
  authenticateUser,
  authorizeUser,
  validate(consultationDetailsSchema),
  async (req, res, next) => {
    await doctorController.updateConsulationDetails(req, res, next);
  },
);

router.put(
  DOCTOR_ENDPOINTS["ADDRESSES"]["UPDATE_ONE"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) => {
    await doctorController.updateAddress(req, res, next);
  },
);

router.patch(
  DOCTOR_ENDPOINTS["PROFILE_PICTURE"]["BASE"],
  authenticateUser,
  authorizeUser,
  profileupload,
  validateFile(updatePersonalProfilePictureSchema),
  async (req, res, next) => {
    await doctorController.updateProfessionalDetails(req, res, next);
  },
);

router.patch(
  DOCTOR_ENDPOINTS["CLINICS"]["SLOTS"]["GENERATE"],
  authenticateUser,
  authorizeUser,
  validate(generateSlotsSchema),
  async (req, res, next) => {
    await doctorSlotController.generateSlots(req, res, next);
  },
);

router.post(
  DOCTOR_ENDPOINTS["CLINICS"]["SLOTS"]["CONFIRM"],
  authenticateUser,
  authorizeUser,
  validate(confirmedSlotsSchema),
  async (req, res, next) => {
    await doctorSlotController.confirmSlots(req, res, next);
  },
);

router.get(
  DOCTOR_ENDPOINTS["SUBSCRIPTION"]["OVERVIEW"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) => {
    await doctorSubscriptionController.getSubscriptionOverview(req, res, next);
  },
);

router.get(
  DOCTOR_ENDPOINTS["SUBSCRIPTION"]["CREATE_ONE"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) => {
    await doctorSubscriptionController.getSubscriptionOverview(req, res, next);
  },
);

router.post(
  DOCTOR_ENDPOINTS["SUBSCRIPTION"]["BUY"]["WALLET"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) => {
    await doctorSubscriptionController.buySubscriptionWithWallet(
      req,
      res,
      next,
    );
  },
);

router.get(
  DOCTOR_ENDPOINTS["SUBSCRIPTION"]["UPGRADE_OPTIONS"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) => {
    await doctorSubscriptionController.getSubscriptionUpgradeOptions(
      req,
      res,
      next,
    );
  },
);

router.patch(
  DOCTOR_ENDPOINTS["SUBSCRIPTION"]["CANCEL"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) => {
    await doctorSubscriptionController.cancelSubscription(req, res, next);
  },
);

router.get(
  DOCTOR_ENDPOINTS["DASHBOARD"]["OVERVIEW"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) => {
    await doctorDashboardController.getDashboardOverview(req, res, next);
  },
);

router.get(
  DOCTOR_ENDPOINTS["DASHBOARD"]["CALENDAR_SLOTS"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) => {
    await doctorDashboardController.getCalendarSlotsByDate(req, res, next);
  },
);

export default router;
