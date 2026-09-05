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
import { doctorProfileController, doctorRegisterController, updateDoctorAddressController, updateDoctorConsultationDetailsController, updateDoctorProfessionalDetailsController, updateDoctorProfilePictureController } from "../../container/index.ts";

const router = Router();

// Routes
router.get(
  DOCTOR_ENDPOINTS["profile"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) => {
    await doctorProfileController.handle(req, res, next);
  },
);

router.post(
  DOCTOR_ENDPOINTS["register"],
  doctorUpload,
  validate(doctorRegistrationSchema),
  async (req, res, next) => {
    await doctorRegisterController.handle(req, res, next);
  },
);

router.put(
  DOCTOR_ENDPOINTS["professionalDetails"],
  authenticateUser,
  authorizeUser,
  validate(professionalDetailsSchema),
  async (req, res, next) => {
    await updateDoctorProfessionalDetailsController.handle(req, res, next);
  },
);

router.put(
  DOCTOR_ENDPOINTS["consultationDetails"],
  authenticateUser,
  authorizeUser,
  validate(consultationDetailsSchema),
  async (req, res, next) => {
    await updateDoctorConsultationDetailsController.handle(req, res, next);
  },
);

router.put(
  DOCTOR_ENDPOINTS["address"],
  authenticateUser,
  authorizeUser,
  async (req, res, next) => {
    await updateDoctorAddressController.handle(req, res, next);
  },
);

router.patch(
  DOCTOR_ENDPOINTS["profile_picture"],
  authenticateUser,
  authorizeUser,
  profileupload,
  validateFile(updatePersonalProfilePictureSchema),
  async (req, res, next) => {
    await updateDoctorProfilePictureController.handle(req, res, next);
  },
);

export default router;
