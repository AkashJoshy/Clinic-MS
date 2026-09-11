import { fetchPatientProfiles } from "@/services/patient.service";
import { useAuthStore } from "@/store";
import { useEffect } from "react";

export function usePatientProfiles() {
  const {
    patient
  } = useAuthStore((state) => state.users);
  const setPatients = useAuthStore((state) => state.setPatients);
  const patients = useAuthStore((state) => state.patients);
  const setActivePatient = useAuthStore((state) => state.setActivePatient);
  const activePatient = useAuthStore((state) => state.activePatient);

  useEffect(() => {
    if (!patient) return;
    
    if (patients.length > 0) return
    const fetchProfiles = async () => {
      try {
        if (!patient.id) return
        const profiles = await fetchPatientProfiles(patient.id);
        console.log(`Profiles from the API`);
        console.log(profiles);
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
  }, [patient]);
}
