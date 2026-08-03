import type { Dispatch, SetStateAction } from "react";
import type { DeleteMethods, ImageData } from "./common";
import type { Address, User } from "./user";
import type React from "react";

export interface Patient {
  id: null | string;
  userId: string;
  displayName: string;
  patientNumber: string;
  imageUrl: ImageData;
  relation: RelationToPatient;
  medicalInformation: MedicalInformation;
  emergencyContact: EmergencyContact;
  dateOfBirth: string;
  gender: Gender;
  createdAt: string;
  updatedAt: string;
}

export interface MedicalInformation {
  bloodGroup: string;
  allergies: string[];
  chronicConditions: string[];
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: RelationToPatient;
}

type BaseProfile = Omit<
  Patient,
  | "id"
  | "patientNumber"
  | "displayName"
  | "medicalInformation"
  | "emergencyContact"
  | "createdAt"
  | "updatedAt"
  | "imageUrl"
>;

export type BaseAddress = Omit<
  Address,
  "createdAt" | "updatedAt" | "ownerId" | "ownerType"
>;

export type ProfileDto = BaseProfile & MedicalInformation & { name: string };

export interface LocationDto {
  latitude: number;
  longitude: number;
  radius: number;
}

export interface BookingData {
  departmentId: string | null;
  changeDepartment: (id: string) => void;
  doctorId: string | null;
  changeDoctor: (id: string) => void;
  reason: string;
  date: string;
  time: string;
  notes: string;
}

type RelationToPatient =
  | ""
  | "Father"
  | "Mother"
  | "Parent"
  | "Husband"
  | "Wife"
  | "Spouse"
  | "Son"
  | "Daughter"
  | "Child"
  | "Brother"
  | "Sister"
  | "Sibling"
  | "Grandfather"
  | "Grandmother"
  | "Grandparent"
  | "Grandson"
  | "Granddaughter"
  | "Grandchild"
  | "Uncle"
  | "Aunt"
  | "Nephew"
  | "Niece"
  | "Cousin"
  | "Father_In_Law"
  | "Mother_In_Law"
  | "Brother_In_Law"
  | "Sister_In_Law"
  | "Son_In_Law"
  | "Daughter_In_Law"
  | "Guardian"
  | "Relative"
  | "Friend"
  | "Other"
  | "Self";

export type Gender = "Male" | "Female" | "Others" | "Prefer Not To Say";

export interface FilterState {
  status: string[];
  dateFilter: "ALL" | "TODAY" | "UPCOMING" | "PAST" | "CUSTOM";
  startDate: string;
  endDate: string;
  doctorName: string;
  clinicName: string;
  department: string;
  consultationMode: "ALL" | "ONLINE" | "OFFLINE" | "BOTH";
  sortBy: "NEWEST" | "OLDEST" | "DATE_ASC" | "DATE_DESC";
}

export interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onApplyFilters: (filters: FilterState) => void;
  departments: { id: string; name: string }[];
  doctors: string[];
}

export type PatientProfile = {
  patient: Omit<Patient, "imageUrl"> & {
    imageUrl: Omit<ImageData, "publicId">;
  };
} & {
  address: BaseAddress | null;
};

export type PatientInfo = PatientProfile & {
  user: Pick<
    User,
    "email" | "phone" | "createdAt" | "isActive" | "isEmailVerified"
  >;
}

export type PatientBasicInfo = {
  patient: 
    Pick<Patient, "id" | "displayName" | "patientNumber" | "medicalInformation" | "gender" | "userId"> &  {
    imageUrl: Omit<ImageData, "publicId">,
  }  
} & {
  address: BaseAddress | null
} & {
  user: Pick<User, "email" | "phone" | "isActive">
}

type FormChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;
type FormEvent = React.FormEvent<HTMLElement>;

export type PersonalDetailsProps = {
  handleSave: (prof: PersonalProfile) => boolean;
  handleChange: (e: FormChangeEvent) => void;
  displayClasses: string;
  labelClasses: string;
  inputClasses: string;
  patientProfile: PersonalProfile;
  originalProfile: PersonalProfile;
  setProfile: (pro: PersonalProfile) => void;
  setOriginalProfile: (pro: PersonalProfile) => void;
};

export type AddressDetailsProps = {
  handleSave: (addr: ProfileAddress) => boolean;
  handleChange: (e: FormChangeEvent) => void;
  disabledInputClasses: string;
  labelClasses: string;
  inputClasses: string;
  address: ProfileAddress;
  originalAddress: ProfileAddress;
  setAddress: Dispatch<SetStateAction<ProfileAddress>>;
  setOriginalAddress: Dispatch<SetStateAction<ProfileAddress>>;
};

export interface PersonalProfile {
  id: string;
  displayName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: Gender;
  bloodGroup: string;
  allergies: string[];
  chronicConditions: string[];
}

export interface ProfileAddress {
  ownerId: string;
  addressLine: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
}

export interface DeletePatientDto {
  id: string,
  method: DeleteMethods
}
