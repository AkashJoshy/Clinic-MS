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
import { createPatientProfileController, patientProfilesController, updatePatientAddressController, updatePatientProfileController, updatePatientProfilePictureController } from "../../container/index.ts";

const router = Router();

// Routes
router.get(
  PATIENT_ENDPOINTS["FETCH_PATIENT_PROFILES"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) => {
    await patientProfilesController.handle(req, res, next);
  },
);

router.patch(
  PATIENT_ENDPOINTS["UPDATE_PATIENT_PROFILE"],
  authenticateUser,
  authorizeUser,
  validate(updatePersonalDetailsSchema),
  async (req, res, next) => {
    await updatePatientProfileController.handle(req, res, next);
  },
);

router.patch(
  PATIENT_ENDPOINTS["UPDATE_PATIENT_PROFILE_ADDRESS"],
  authenticateUser,
  authorizeUser,
  validate(updateAddressSchema),
  async (req, res, next) => {
    await updatePatientAddressController.handle(req, res, next);
  },
);

router.patch(
  PATIENT_ENDPOINTS["UPDATE_PATIENT_PROFILE_PICTURE"],
  authenticateUser,
  authorizeUser,
  profileupload,
  validateFile(updatePersonalProfilePictureSchema),
  async (req, res, next) => {
    await updatePatientProfilePictureController.handle(req, res, next);
  },
);

router.post(
  PATIENT_ENDPOINTS["CREATE_PATIENT_PROFILE"],
  authenticateUser,
  authorizeUser,
  validate(createPatientProfileSchema),
  async (req, res, next) => {
    await createPatientProfileController.handle(req, res, next);
  },
);

export default router;
