import type { SessionStatus } from "@/types/common";
import type { DoctorProfileData } from "@/types/doctor";

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