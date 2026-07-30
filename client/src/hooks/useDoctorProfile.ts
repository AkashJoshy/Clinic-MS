import { fetchDoctorProfile } from "@/services/doctor.service";
import { useAuthStore } from "@/store";
import { useEffect } from "react";

export function useDoctorProfile() {
  const user = useAuthStore((state) => state.user);
  const setDoctor = useAuthStore((state) => state.setDoctor);

  useEffect(() => {
    if (!user || !user.id) return;
    const fetchDoctor = async () => {
      try {
        const doctordata = await fetchDoctorProfile(user.id!);
        setDoctor(doctordata?.data)
      } catch (error) {
        throw new Error("Error finding profiles..");
      }
    };

    fetchDoctor();
  }, [user]);
}
