import type { ScheduleFormSchemaFormData } from "@/schemas/doctor/doctor.schema";
import { scheduleFormSchema } from "@/schemas/doctor/schedule-form.schema";
import { useAuthStore } from "@/store";
import type { MutateFn } from "@/types/common";
import type {
  UseScheduleFormReturn,
  WeeklySchedule,
} from "@/types/doctor-clinic";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";


export function useScheduleForm<T extends ScheduleFormSchemaFormData>(mutateFn: MutateFn<T>): UseScheduleFormReturn {
  const doctorDetails = useAuthStore((state) => state.doctor);
  const [selectedClinicId, setSelectedClinicId] = useState(
    doctorDetails?.doctorClinicDetails[0]?.clinic?.id,
  );
  const selectedClinic = useMemo(() => {
    const clinic = doctorDetails?.doctorClinicDetails.find(
      (dc) => dc.clinic?.id === selectedClinicId,
    );
    return clinic;
  }, [doctorDetails?.doctorClinicDetails, selectedClinicId]);

  const [schedule, setSchedule] = useState<WeeklySchedule[] | undefined>(
    selectedClinic?.weeklySchedule,
  );
  const [slotRules, setSlotRules] = useState(selectedClinic?.slotRules);
  const [exceptions, setExceptions] = useState(selectedClinic?.exceptions);

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    trigger,
    reset,
    formState: { errors, isSubmitted },
  } = useForm<ScheduleFormSchemaFormData>({
    resolver: zodResolver(scheduleFormSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      doctorClinicId: selectedClinic?.id!,
      doctorId: doctorDetails?.doctor?.id!,
      clinicId: selectedClinic?.clinic?.id!,
      weeklySchedule: selectedClinic?.weeklySchedule,
      slotRules: selectedClinic?.slotRules,
      exceptions: selectedClinic?.exceptions,
    },
  });

  const scheduleLength = useMemo(() => {
    if (!schedule) return 0;
    const currentSchedule = watch("weeklySchedule");
    return currentSchedule.reduce(
      (total, daySchedule) => total + daySchedule.shifts.length,
      0,
    );
  }, [schedule, selectedClinic]);

  const handleClinicChange = (clinicId: string) => {
    const doctorClinic = doctorDetails?.doctorClinicDetails.find(
      (dc) => dc.clinic?.id === clinicId,
    );

    if (!doctorClinic?.clinic) return;
    setSelectedClinicId(clinicId);

    const weeklySchedule = doctorClinic.weeklySchedule.map((day) => ({
      ...day,
      shifts: day.shifts.map((shift) => ({ ...shift })),
    }));

    const slotRules = doctorClinic.slotRules;
    const exceptions = doctorClinic.exceptions;

    setSchedule(weeklySchedule);
    setSlotRules(slotRules);
    setExceptions(exceptions);

    reset({
      clinicId: doctorClinic.clinic.id!,
      doctorId: doctorDetails?.doctor.id!,
      doctorClinicId: doctorClinic.id!,
      weeklySchedule: doctorClinic?.weeklySchedule,
      slotRules: doctorClinic?.slotRules,
      exceptions: doctorClinic?.exceptions,
    });
  };

  const handleGenerateSlots = () => {
    const submitHandler = handleSubmit(
      (data) => {
        console.log("Valid form data:", data);
        mutateFn(data as T)
      },
      (errors) => {
        console.log("Validation errors:", errors);

        console.log("ALL TRUE VALUES");
        console.log(watch());
      },
    );

    submitHandler();
  };

  return {
    schedule,
    setSchedule,
    slotRules,
    setSlotRules,
    exceptions,
    setExceptions,
    scheduleLength,
    handleClinicChange,
    selectedClinic,
    selectedClinicId,
    doctorDetails,
    setValue,
    register,
    watch,
    errors,
    isSubmitted,
    trigger,
    handleSubmit,
    handleGenerateSlots,
  };
}
