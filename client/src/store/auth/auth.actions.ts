import type { User } from "@/types/user";
import type { TokenPair, Tokens } from "@/types/auth";
import type { PatientProfile } from "@/types/patient";
import type { DoctorInfo } from "@/types/doctor";

export interface AuthActions {
  setHasHydrated: (val: boolean) => void
  login: (token: string, user: User, role: keyof Tokens) => void;
  logout: (role: keyof Tokens) => void;
  setError: (error: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  setUser: (user: User) => void;
  setDoctor: (doctor: DoctorInfo) => void
  updateToken: (accessToken: string, role: keyof Tokens) => void,
  updateUser: (partial: Partial<User>) => void;
  updateDoctor: (doctor: Partial<DoctorInfo>) => void
  updatePatients: (patient: PatientProfile) => void;
  setPatients: (patients: PatientProfile[]) => void;
  setActivePatient: (patient: PatientProfile) => void;
  updateActivePatient: (partial: Partial<PatientProfile>) => void;
}
