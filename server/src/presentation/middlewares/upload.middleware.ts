import multer from "multer";
import { ALLOWED_DOCUMENT_TYPES } from "../../domain/constants/user.constants.ts";

const storage = multer.memoryStorage()

const fileFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
  const allowedTypes = ALLOWED_DOCUMENT_TYPES

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, JPG, PNG, WEBP files are allowed"));
  }
};

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter
})


export const doctorUpload = upload.fields([
  { name: "doctorProfilePicture", maxCount: 1 },
  { name: "clinicRegistrationDoc", maxCount: 1 },
  { name: "establishmentLicenceDoc", maxCount: 1 },
  { name: "medicalLicenceDoc", maxCount: 1 },
  { name: "doctorRegistrationDoc", maxCount: 1 },
])


export const profileupload = upload.single("profilePicture")