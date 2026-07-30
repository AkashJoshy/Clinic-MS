import multer from "multer";

const storage = multer.memoryStorage()

const fileFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, PNG, WEBP allowed"));
  }
};

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter
})


export const clinicUpload = upload.fields([
  { name: "clinicPhoto", maxCount: 1 },
  { name: "clinicRegistrationDoc", maxCount: 1 },
  { name: "idProofDoc", maxCount: 1 },
  { name: "medicalEstablishmentDoc", maxCount: 1 },
]);

export const doctorUpload = upload.single("licenceDocument")


export const profileupload = upload.single("profilePicture")