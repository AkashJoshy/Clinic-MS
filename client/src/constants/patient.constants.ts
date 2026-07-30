import type { PersonalProfile } from "@/types/patient";

export const emptyProfile: PersonalProfile = {
  id: "",
  displayName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "Male",
  bloodGroup: "",
  allergies: [],
  chronicConditions: []
} as const