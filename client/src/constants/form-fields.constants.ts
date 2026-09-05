export const ALLOWED_DOC_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
] as const;

export const ALLOWED_IMG_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export const ROLES = ["PATIENT", "DOCTOR", "CLINIC", "ADMIN"] as const;

export const GENDER = [
  "MALE",
  "FEMALE",
  "OTHERS",
  "PREFER NOT TO SAY",
] as const;

export const GENDER_WITH_LABEL = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
  { label: "Others", value: "OTHERS" },
  { label: "Prefer Not To Say", value: "PREFER NOT TO SAY" },
];

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
  "Self",
] as const;

export const BLOODGROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
