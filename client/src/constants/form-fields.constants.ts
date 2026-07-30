export const ALLOWED_DOC_TYPES = ["application/pdf", "image/jpeg", "image/png"] as const

export const ALLOWED_IMG_TYPES = ["image/jpeg", "image/png", "image/webp"] as const

export const COUNTRIES = ["India", "USA", "UK"] as const;

export const ROLES = ["PATIENT", "DOCTOR", "CLINIC", "ADMIN"] as const

export const GENDER = [
  "Male",
  "Female",
  "Others",
  "Prefer Not To Say"
] as const

export const RELATIONS = [
  // "",
  "Father",
  "Mother",
  "Parent",
  "Husband",
  "Wife",
  "Spouse",
  "Son",
  "Daughter",
  "Child",
  "Brother",
  "Sister",
  "Sibling",
  "Grandfather",
  "Grandmother",
  "Grandparent",
  "Grandson",
  "Granddaughter",
  "Grandchild",
  "Uncle",
  "Aunt",
  "Nephew",
  "Niece",
  "Cousin",
  "Father_In_Law",
  "Mother_In_Law",
  "Brother_In_Law",
  "Sister_In_Law",
  "Son_In_Law",
  "Daughter_In_Law",
  "Guardian",
  "Relative",
  "Friend",
  "Other",
  "Self"
] as const;

export const BLOODGROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]