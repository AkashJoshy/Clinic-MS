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