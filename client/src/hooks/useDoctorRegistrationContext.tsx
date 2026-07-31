
import { createContext, useContext } from "react";
import type { UseDoctorRegistrationReturn } from "./useDoctorRegistration";

export const DoctorRegistrationContext =
  createContext<UseDoctorRegistrationReturn | null>(null);

export function useDoctorRegistrationContext() {
  const ctx = useContext(DoctorRegistrationContext);
  if (!ctx) throw new Error("Must be used inside DoctorRegistrationProvider");
  return ctx
}