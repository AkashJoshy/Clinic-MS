import type { EmergencyContactDetails, PersonalProfile, ProfileAddress, ProfileEmergency } from "@/types/patient";

export const emptyAddress: ProfileAddress = {
  ownerId: "",
  addressLine: "",
  country: "",
  state: "",
  city: "",
  pincode: "",
};

export const emptyEmergency: EmergencyContactDetails = {
  id: "",
  name: "",
  phone: "",
  relationship: "",
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

export const RELATION_API_TO_LABEL: Record<string, string> = {
  FATHER: "Father",
  MOTHER: "Mother",
  PARENT: "Parent",
  HUSBAND: "Husband",
  WIFE: "Wife",
  SPOUSE: "Spouse",
  SON: "Son",
  DAUGHTER: "Daughter",
  CHILD: "Child",
  BROTHER: "Brother",
  SISTER: "Sister",
  SIBLING: "Sibling",
  GRANDFATHER: "Grandfather",
  GRANDMOTHER: "Grandmother",
  GRANDPARENT: "Grandparent",
  GRANDSON: "Grandson",
  GRANDDAUGHTER: "Granddaughter",
  GRANDCHILD: "Grandchild",
  UNCLE: "Uncle",
  AUNT: "Aunt",
  NEPHEW: "Nephew",
  NIECE: "Niece",
  COUSIN: "Cousin",
  FATHER_IN_LAW: "Father-in-Law",
  MOTHER_IN_LAW: "Mother-in-Law",
  BROTHER_IN_LAW: "Brother-in-Law",
  SISTER_IN_LAW: "Sister-in-Law",
  SON_IN_LAW: "Son-in-Law",
  DAUGHTER_IN_LAW: "Daughter-in-Law",
  GUARDIAN: "Guardian",
  RELATIVE: "Relative",
  FRIEND: "Friend",
  OTHER: "Other",
  SELF: "Self",
};