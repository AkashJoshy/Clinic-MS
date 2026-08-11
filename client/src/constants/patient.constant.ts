import type { PersonalProfile, ProfileAddress } from "@/types/patient";

export const emptyAddress: ProfileAddress = {
  ownerId: "",
  addressLine: "",
  country: "",
  state: "",
  city: "",
  pincode: "",
};

export const emptyProfile: PersonalProfile = {
  id: "",
  displayName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "MALE",
  bloodGroup: "",
  allergies: [],
  chronicConditions: [],
};

export const GENDER_API_TO_LABEL: Record<string, string> = {
  MALE: "Male",
  FEMALE: "Female",
  OTHERS: "Others",
  "PREFER NOT TO SAY": "Prefer not to say",
};
