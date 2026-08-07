export const USER_ROLES = ["PATIENT", "ADMIN", "CLINIC", "DOCTOR"] as const
export const PROVIDER = ["LOCAL", "GOOGLE"]

export const FILE_SIZE_5MB = 5 * 1024 * 1024;
export const FILE_SIZE_2MB = 2 * 1024 * 1024;

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export const ALLOWED_DOCUMENT_TYPES = [
  ...ALLOWED_IMAGE_TYPES,
  "application/pdf",
]