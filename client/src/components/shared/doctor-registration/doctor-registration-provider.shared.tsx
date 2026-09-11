import { useDoctorRegistration } from "@/hooks/use-doctor-registration.hook";
import {
  DoctorRegistrationContext,
  useDoctorRegistrationContext,
} from "@/contexts/use-doctor-registration.context";
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
