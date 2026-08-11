import { useDoctorRegistration } from "@/hooks/useDoctorRegistration";
import {
  DoctorRegistrationContext,
  useDoctorRegistrationContext,
} from "@/contexts/useDoctorRegistrationContext";
import { type ReactNode } from "react";

const DoctorRegistrationProvider = ({ children }: { children: ReactNode }) => {
  const useDoctorContext = useDoctorRegistration();

  return (
    <DoctorRegistrationContext.Provider value={useDoctorContext}>
      {children}
    </DoctorRegistrationContext.Provider>
  );
};

export default DoctorRegistrationProvider;
