import { Router } from "express";
import { PATIENT_ENDPOINTS } from "../endpoints/patient.endpoints.ts";
import { authenticateUser } from "../middlewares/authenticate-user.middleware.ts";
import { authorizeUser } from "../middlewares/authorize-user.middleware.ts";
import { profileupload } from "../middlewares/upload.middleware.ts";
import {
  createPatientProfileSchema,
  updatePersonalDetailsSchema,
} from "../schemas/patient/patient.schema.ts";
import { validate } from "../middlewares/validate.middleware.ts";
import {
  updateAddressSchema,
  updatePersonalProfilePictureSchema,
} from "../schemas/shared/shared.schema.ts";
import { validateFile } from "../middlewares/validate-file.middleware.ts";
import { updatePatientEmergencyContactSchema } from "../schemas/patient/profile.schema.ts";
import {
  patientController,
  patientDoctorController
} from "../../container/modules/patient.modules.ts";

const router = Router();

// Routes
router.get(
  PATIENT_ENDPOINTS["PROFILES"]["FETCH_ONE"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) => {
    await patientController.getProfiles(req, res, next);
  },
);

router.post(
  PATIENT_ENDPOINTS["PROFILES"]["CREATE_ONE"],
  authenticateUser,
  authorizeUser,
  validate(createPatientProfileSchema),
  async (req, res, next) => {
    await patientController.createProfile(req, res, next);
  },
);

router.patch(
  PATIENT_ENDPOINTS["PROFILES"]["UPDATE_ONE"],
  authenticateUser,
  authorizeUser,
  validate(updatePersonalDetailsSchema),
  async (req, res, next) => {
    await patientController.updateProfile(req, res, next);
  },
);

router.patch(
  PATIENT_ENDPOINTS["PROFILES"]["ADDRESS"]["UPDATE_ONE"],
  authenticateUser,
  authorizeUser,
  validate(updateAddressSchema),
  async (req, res, next) => {
    await patientController.updateAddress(req, res, next);
  },
);

router.patch(
  PATIENT_ENDPOINTS["PROFILES"]["EMERGENCY_CONTACT"]["UPDATE_ONE"],
  authenticateUser,
  authorizeUser,
  validate(updatePatientEmergencyContactSchema),
  async (req, res, next) => {
    await patientController.updateProfileEmergencyContact(req, res, next);
  },
);

router.patch(
  PATIENT_ENDPOINTS["PROFILES"]["PROFILE_PICTURE"]["UPDATE_ONE"],
  authenticateUser,
  authorizeUser,
  profileupload,
  validateFile(updatePersonalProfilePictureSchema),
  async (req, res, next) => {
    await patientController.updateProfilePicture(req, res, next);
  },
);

router.get(
  PATIENT_ENDPOINTS["DOCTORS"]["FETCH_ALL"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) => {
    await patientDoctorController.getAll(req, res, next);
  },
);

export default router;
