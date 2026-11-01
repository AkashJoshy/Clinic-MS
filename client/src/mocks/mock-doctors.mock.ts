export type ConsultationMode = "online" | "in-clinic";
export type AvailabilityType = "today" | "tomorrow" | "this-week" | "unavailable";

export interface Doctor {
  id: string;
  name: string;
  image: string;
  specialization: string;
  rating: number;
  reviewCount: number;
  experience: number;
  location: string;
  consultationFee: number;
  consultationModes: ConsultationMode[];
  availability: AvailabilityType;
  availableSlots: string[];
  verified: boolean;
  gender: "male" | "female";
}

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: "d1",
    name: "Dr. Anjali Menon",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    specialization: "Cardiology",
    rating: 4.8,
    reviewCount: 124,
    experience: 12,
    location: "Kochi, Kerala",
    consultationFee: 500,
    consultationModes: ["online", "in-clinic"],
    availability: "today",
    availableSlots: ["10:30 AM", "11:00 AM", "12:00 PM"],
    verified: true,
    gender: "female",
  },
  {
    id: "d2",
    name: "Dr. Rahul Nair",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    specialization: "Dermatology",
    rating: 4.6,
    reviewCount: 89,
    experience: 8,
    location: "Thiruvananthapuram, Kerala",
    consultationFee: 400,
    consultationModes: ["online"],
    availability: "today",
    availableSlots: ["09:00 AM", "09:30 AM", "10:00 AM"],
    verified: true,
    gender: "male",
  },
  {
    id: "d3",
    name: "Dr. Priya Krishnan",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    specialization: "Neurology",
    rating: 4.9,
    reviewCount: 210,
    experience: 15,
    location: "Kozhikode, Kerala",
    consultationFee: 700,
    consultationModes: ["in-clinic"],
    availability: "tomorrow",
    availableSlots: ["11:00 AM", "02:00 PM"],
    verified: true,
    gender: "female",
  },
  {
    id: "d4",
    name: "Dr. Arun Pillai",
    image: "https://randomuser.me/api/portraits/men/47.jpg",
    specialization: "Orthopedics",
    rating: 4.5,
    reviewCount: 76,
    experience: 10,
    location: "Thrissur, Kerala",
    consultationFee: 600,
    consultationModes: ["online", "in-clinic"],
    availability: "today",
    availableSlots: ["03:00 PM", "03:30 PM", "04:00 PM"],
    verified: true,
    gender: "male",
  },
  {
    id: "d5",
    name: "Dr. Sindhu Varma",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    specialization: "Pediatrics",
    rating: 4.7,
    reviewCount: 158,
    experience: 9,
    location: "Kannur, Kerala",
    consultationFee: 350,
    consultationModes: ["online", "in-clinic"],
    availability: "today",
    availableSlots: ["10:00 AM", "10:30 AM", "11:30 AM"],
    verified: true,
    gender: "female",
  },
  {
    id: "d6",
    name: "Dr. Suresh Kumar",
    image: "https://randomuser.me/api/portraits/men/58.jpg",
    specialization: "General Medicine",
    rating: 4.3,
    reviewCount: 53,
    experience: 6,
    location: "Kollam, Kerala",
    consultationFee: 250,
    consultationModes: ["in-clinic"],
    availability: "this-week",
    availableSlots: ["09:00 AM", "12:00 PM"],
    verified: false,
    gender: "male",
  },
  {
    id: "d7",
    name: "Dr. Deepa Rajan",
    image: "https://randomuser.me/api/portraits/women/77.jpg",
    specialization: "Cardiology",
    rating: 4.9,
    reviewCount: 300,
    experience: 18,
    location: "Ernakulam, Kerala",
    consultationFee: 800,
    consultationModes: ["online", "in-clinic"],
    availability: "today",
    availableSlots: ["01:00 PM", "01:30 PM", "02:30 PM"],
    verified: true,
    gender: "female",
  },
  {
    id: "d8",
    name: "Dr. Manoj Thomas",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    specialization: "Dermatology",
    rating: 4.4,
    reviewCount: 67,
    experience: 5,
    location: "Palakkad, Kerala",
    consultationFee: 300,
    consultationModes: ["online"],
    availability: "tomorrow",
    availableSlots: ["10:00 AM", "11:00 AM"],
    verified: true,
    gender: "male",
  },
  {
    id: "d9",
    name: "Dr. Rekha Mohan",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
    specialization: "Neurology",
    rating: 4.6,
    reviewCount: 142,
    experience: 11,
    location: "Alappuzha, Kerala",
    consultationFee: 650,
    consultationModes: ["in-clinic"],
    availability: "this-week",
    availableSlots: ["02:00 PM", "03:00 PM"],
    verified: true,
    gender: "female",
  },
  {
    id: "d10",
    name: "Dr. Vivek Gopalan",
    image: "https://randomuser.me/api/portraits/men/36.jpg",
    specialization: "Orthopedics",
    rating: 4.2,
    reviewCount: 41,
    experience: 4,
    location: "Malappuram, Kerala",
    consultationFee: 450,
    consultationModes: ["online", "in-clinic"],
    availability: "today",
    availableSlots: ["08:30 AM", "09:00 AM", "09:30 AM"],
    verified: false,
    gender: "male",
  },
  {
    id: "d11",
    name: "Dr. Lakshmi Nambiar",
    image: "https://randomuser.me/api/portraits/women/90.jpg",
    specialization: "General Medicine",
    rating: 4.8,
    reviewCount: 195,
    experience: 14,
    location: "Kottayam, Kerala",
    consultationFee: 300,
    consultationModes: ["online", "in-clinic"],
    availability: "today",
    availableSlots: ["11:30 AM", "12:00 PM", "12:30 PM"],
    verified: true,
    gender: "female",
  },
  {
    id: "d12",
    name: "Dr. Sajeev Menon",
    image: "https://randomuser.me/api/portraits/men/73.jpg",
    specialization: "Pediatrics",
    rating: 4.5,
    reviewCount: 88,
    experience: 7,
    location: "Kochi, Kerala",
    consultationFee: 400,
    consultationModes: ["online"],
    availability: "tomorrow",
    availableSlots: ["10:00 AM", "10:30 AM"],
    verified: true,
    gender: "male",
  },
];

export const SPECIALIZATIONS = [
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "General Medicine",
];

export const AVAILABILITY_OPTIONS = [
  { label: "Available today", value: "today" },
  { label: "Available tomorrow", value: "tomorrow" },
  { label: "Available this week", value: "this-week" },
];

export const CONSULTATION_TYPES: { label: string; value: "online" | "offline" }[] = [
  { label: "Online", value: "online" },
  { label: "In-clinic", value: "offline" },
];

export const EXPERIENCE_OPTIONS = [
  { label: "0–5 years", value: "0-5" },
  { label: "5–10 years", value: "5-10" },
  { label: "10+ years", value: "10+" },
];

export const RATING_OPTIONS = [
  { label: "4★ & above", value: "4" },
  { label: "3★ & above", value: "3" },
];

export const SORT_OPTIONS = [
  { label: "Relevance", value: "relevance" },
  { label: "Rating", value: "rating" },
  { label: "Experience", value: "experience" },
  { label: "Consultation fee", value: "fee" },
];
