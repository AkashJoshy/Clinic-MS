import { Router } from "express";
import { DOCTOR_ENDPOINTS } from "../endpoints/doctor.endpoints.ts";
import { authenticateUser } from "../middlewares/authenticate-user.middleware.ts";
import { authorizeUser } from "../middlewares/authorize-user.middleware.ts";
import { validate } from "../middlewares/validate.middleware.ts";
import {
  doctorAadhaarUpload,
  doctorPanUpload,
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
  doctorKycController,
  doctorReapplicationController,
  doctorSettingsController,
  doctorSlotController,
  doctorSubscriptionController,
} from "../../container/modules/doctor.modules.ts";
import {
  aadhaarDetailsSchema,
  aadhaarFileSchema,
  bankAccountDetailsSchema,
  panDetailsSchema,
  panFileSchema,
} from "../schemas/doctor/kyc.schema.ts";
import { personalDetailsSchema } from "../schemas/doctor/personal-details.schema.ts";
import { updateDoctorSettingsSchema } from "../schemas/doctor/update-doctor-settings.schema.ts";

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

router.get(
  DOCTOR_ENDPOINTS["KYC"]["GET"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) => {
    await doctorKycController.getDoctorKycDetails(req, res, next);
  },
);

router.get(
  DOCTOR_ENDPOINTS["KYC"]["PAN"]["UPDATE"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) => {
    await doctorKycController.getPanDetails(req, res, next);
  },
);

router.get(
  DOCTOR_ENDPOINTS["KYC"]["BANK"]["UPDATE"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) => {
    await doctorKycController.getBankDetails(req, res, next);
  },
);

router.get(
  DOCTOR_ENDPOINTS["KYC"]["AADHAAR"]["UPDATE"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) => {
    await doctorKycController.getAadhaarDetails(req, res, next);
  },
);
//
router.patch(
  DOCTOR_ENDPOINTS["KYC"]["PAN"]["UPDATE"],
  doctorPanUpload,
  authenticateUser,
  authorizeUser,
  validate(panDetailsSchema),
  validateFile(panFileSchema),
  async (req, res, next) => {
    await doctorKycController.updatePanDetails(req, res, next);
  },
);

router.patch(
  DOCTOR_ENDPOINTS["KYC"]["BANK"]["UPDATE"],
  authenticateUser,
  authorizeUser,
  validate(bankAccountDetailsSchema),
  async (req, res, next) => {
    await doctorKycController.updateBankDetails(req, res, next);
  },
);

router.patch(
  DOCTOR_ENDPOINTS["PERSONAL_DETAILS"]["UPDATE_ONE"],
  authenticateUser,
  authorizeUser,
  validate(personalDetailsSchema),
  async (req, res, next) => {
    await doctorController.updatePersonalDetails(req, res, next);
  },
);

router.get(
  DOCTOR_ENDPOINTS["SETTINGS"]["FETCH_ONE"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) => {
    await doctorSettingsController.getDoctorSettings(req, res, next);
  },
);

router.patch(
  DOCTOR_ENDPOINTS["SETTINGS"]["UPDATE_ONE"],
  authenticateUser,
  authorizeUser,
  validate(updateDoctorSettingsSchema),
  async (req, res, next) => {
    await doctorSettingsController.updateDoctorSettings(req, res, next);
  },
);

export default router;
