import type { PersonalProfile } from "@/types/patient";

export const emptyProfile: PersonalProfile = {
  id: "",
  displayName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "MALE",
  bloodGroup: "",
  allergies: [],
  chronicConditions: []
} as const