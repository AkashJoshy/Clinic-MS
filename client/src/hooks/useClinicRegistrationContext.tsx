
import { createContext, useContext } from "react";
import type { UseClinicRegistrationReturn } from "./useClinicRegistration";

export const ClinicRegistrationContext =
  createContext<UseClinicRegistrationReturn | null>(null);

export function useClinicRegistrationContext() {
  const ctx = useContext(ClinicRegistrationContext);
  if (!ctx) throw new Error("Must be used inside ClinicRegistrationProvider");
  return ctx;
}