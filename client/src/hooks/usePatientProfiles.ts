import { fetchPatientProfiles } from "@/services/patient.service";
import { useAuthStore } from "@/store";
import { useEffect } from "react";

export function usePatientProfiles() {
  const user = useAuthStore((state) => state.user);
  const setPatients = useAuthStore((state) => state.setPatients);
  const patients = useAuthStore((state) => state.patients);
  const setActivePatient = useAuthStore((state) => state.setActivePatient);
  const activePatient = useAuthStore((state) => state.activePatient);

  useEffect(() => {
    if (!user) return;
    
    if (patients.length > 0) return
    const fetchProfiles = async () => {
      try {
        if (!user.id) return
        const profiles = await fetchPatientProfiles(user.id);
        const activeProfile = profiles.data.find(
          (p: { patient: { relation: string; }; }) => p.patient.relation == "SELF",
        );
        setPatients(profiles.data);
        if (!activePatient) setActivePatient(activeProfile);
      } catch (error) {
        throw new Error("Error finding profiles..");
      }
    };

    fetchProfiles();
  }, [user]);
}
