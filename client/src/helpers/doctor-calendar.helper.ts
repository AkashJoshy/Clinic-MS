import type { CalendarSlot } from "@/components/shared/doctor/slot-schedules/weekly-schedule-calendar.shared";
import type { Clinic } from "@/types/clinic";
import type { CalendarClinicDetails } from "@/types/doctor-clinic";
import type { GetDoctorCalendarData } from "@/types/doctor-dashboard";

export const mapCalendarSlots = (
  data: GetDoctorCalendarData | null,
): CalendarSlot[] => {
  if (!data) return [];

  return Object.values(data.slots).flatMap((dailySlots) =>
    dailySlots.map((slot) => ({
      id: slot.id,
      doctorId: slot.doctorId,
      clinicId: slot.clinicDetails.id,
      clinicName: slot.clinicDetails.name,
      date: new Date(slot.date).toISOString().slice(0, 10),
      startTime: slot.startTime,
      endTime: slot.endTime,
      status: slot.status,
      mode: slot.doctorClinicDetails.type,
    })),
  );
};


export const mapCalendarClinics = (
  data: GetDoctorCalendarData | null,
): CalendarClinicDetails[] => {
  if (!data) return [];

  const clinicMap = new Map<string, CalendarClinicDetails>();

  Object.values(data.slots).forEach((dailySlots) => {
    dailySlots.forEach((slot) => {
      const clinic = slot.clinicDetails;

      if (!clinicMap.has(clinic.id!)) {
        clinicMap.set(clinic.id!, {
          id: clinic.id,
          name: clinic.name,
          color: "#1dc465",
        });
      }
    });
  });

  return Array.from(clinicMap.values());
};
