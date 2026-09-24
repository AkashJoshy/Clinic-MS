import type { SessionStatus } from "@/types/common";
import type { DoctorProfileData, FieldConfig } from "@/types/doctor";
import { Briefcase, Building2, FileBadge, FileText, GraduationCap, IdCard, ImageIcon, Info, MapPin, Phone, Stethoscope, User } from "lucide-react";

export const initialData: DoctorProfileData = {
  address: {
    id: "",
    ownerId: "",
    addressLine: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
  },
  clinic: {
    id: "",
    name: "",
    about: "",
    location: {
      type: "Point",
      coordinates: [0, 0],
    },
    clinicAddress: {
      id: "",
      ownerId: "",
      addressLine: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
    },
  },
  department: {
    id: "",
    name: "",
  },
  doctor: {
    id: "",
    userId: null,
    displayName: "",
    doctorCode: "",
    profilePicture: {
      url: "",
    },
    bio: "",
    languages: [],
    gender: "MALE",
    departmentId: "",
    specialization: "",
    qualification: "",
    experienceYears: 0,
    licenceNumber: "",
    averageRating: 0,
    totalReviews: 0,
    registrationDoc: {
      url: "",
    },
    medicalLicenceDoc: {
      url: "",
    },
    status: "PENDING",
    createdAt: "",
    updatedAt: "",
  },
  doctorClinic: {
    id: "",
    type: "BOTH",
    consultationFee: 0,
    schedule: [],
    slotDuration: 0,
    timeZone: "",
    isActive: false,
  },
};

export const DAY_NAMES = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

export const LOWERCASE_DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const STATUS_STYLES: Record<SessionStatus, string> = {
  AVAILABLE:
    "bg-emerald-500/15 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20",

  UPCOMING:
    "bg-yellow-500/15 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20",

  BOOKED:
    "bg-orange-400/15 border-orange-400/30 text-orange-400 hover:bg-orange-400/20",

  EXPIRED:
    "bg-white/5 border-white/10 text-white/30",

  DAY_OFF:
    "bg-red-500/10 border-red-500/20 text-red-400",

  PENDING:
    "bg-blue-500/15 border-blue-500/30 text-blue-400 hover:bg-blue-500/20",

  CANCELLED:
    "bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/15",

  COMPLETED:
    "bg-teal-500/15 border-teal-500/30 text-teal-400 hover:bg-teal-500/20",

  UNAVAILABLE:
    "bg-slate-500/10 border-slate-500/20 text-slate-400",

  CONFIRMED:
    "bg-cyan-500/15 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20",

  LIVE:
    "bg-violet-500/15 border-violet-500/30 text-violet-400 hover:bg-violet-500/20",

  MISSED:
    "bg-rose-500/10 border-rose-500/20 text-rose-400",
};


export const FIELDS: FieldConfig[] = [
  {
    name: "fullName",
    label: "Full name",
    placeholder: "Dr. Jane Smith",
    icon: User,
  },
  {
    name: "phone",
    label: "Phone",
    type: "tel",
    placeholder: "+91 98765 43210",
    icon: Phone,
    required: false,
  },
  {
    name: "bio",
    label: "Bio",
    placeholder: "Tell us about yourself",
    icon: FileText,
    type: "textarea",
  },
  {
    name: "gender",
    label: "Gender",
    placeholder: "Select gender",
    icon: User,
    type: "select",
  },
  {
    name: "specialization",
    label: "Specialization",
    placeholder: "Cardiology",
    icon: Stethoscope,
  },
  {
    name: "qualification",
    label: "Qualification",
    placeholder: "MBBS, MD",
    icon: GraduationCap,
  },
  {
    name: "experienceYears",
    label: "Years of experience",
    placeholder: "5",
    icon: Briefcase,
    type: "number",
  },
  {
    name: "licenceNumber",
    label: "License number",
    placeholder: "KL-102938",
    icon: IdCard,
  },
  {
    name: "registrationNumber",
    label: "Registration number",
    placeholder: "REG-102938",
    icon: FileBadge,
  },
  {
    name: "clinicName",
    label: "Clinic name",
    placeholder: "City Care Clinic",
    icon: Building2,
  },
  {
    name: "about",
    label: "About",
    placeholder: "Describe your professional background",
    icon: Info,
    type: "textarea",
  },
  {
    name: "altPhone",
    label: "Alternative phone",
    type: "tel",
    placeholder: "+91 98765 43210",
    icon: Phone,
    required: false,
  },
  {
    name: "addressLine",
    label: "Address",
    placeholder: "Street address",
    icon: MapPin,
  },
  {
    name: "city",
    label: "City",
    placeholder: "Kochi",
    icon: MapPin,
  },
  {
    name: "pincode",
    label: "Pincode",
    placeholder: "682001",
    icon: MapPin,
  },
  {
    name: "doctorProfilePicture",
    label: "Doctor Profile Picture",
    description: "Upload your profile picture.",
    icon: ImageIcon,
    type: "file",
    placeholder: "upload the doctor profile picture",
    accept: "image/png,image/jpeg,image/jpg",
  },
  {
    name: "clinicRegistrationDoc",
    label: "Clinic Registration Document",
    description: "Upload the official clinic registration document.",
    icon: FileText,
    type: "file",
    placeholder: "upload the Clinic Registration Document",
    accept: ".pdf,image/png,image/jpeg",
  },
  {
    name: "establishmentLicenceDoc",
    label: "Establishment Licence Document",
    description: "Upload the clinic establishment licence.",
    icon: FileText,
    type: "file",
    placeholder: "upload the Establishment Licence Document",
    accept: ".pdf,image/png,image/jpeg",
  },
  {
    name: "medicalLicenceDoc",
    label: "Medical Licence Document",
    description: "Upload your medical licence document.",
    icon: FileText,
    type: "file",
    placeholder: "upload the Medical Licence Document",
    accept: ".pdf,image/png,image/jpeg",
  },
  {
    name: "doctorRegistrationDoc",
    label: "Doctor Registration Document",
    description: "Upload your doctor registration certificate.",
    icon: FileText,
    type: "file",
    placeholder: "upload the doctor Registration Document",
    accept: ".pdf,image/png,image/jpeg",
  },
];