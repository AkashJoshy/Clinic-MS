import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { relativeSchema } from "@/schemas/patient/relative.schema";
import type { RelativeFormData } from "@/schemas/patient/patient.schema";
import { useMedicalConditions } from "./useMedicalConditions";

export function usePatientForm() {

  const form = useForm<RelativeFormData>({
    resolver: zodResolver(relativeSchema),
    mode: "onBlur",
    defaultValues: {
      allergies: [],
      chronicConditions: [],
      country: "",
      state: "",
      city: "",
      addressLine: "",
      pincode: "",
    },
  });

  const { watch, setValue } = form;
  const watchedAllergies = watch("allergies") || [];
  const watchedChronicConditions = watch("chronicConditions") || [];

    const {
      allergyInput,
      allergies,
      addAllergy,
      addChronic,
      removeAllergy,
      removeChronic,
      chronicConditions,
      chronicInput,
      setAllergyInput,
      setChronicInput,
    } = useMedicalConditions<RelativeFormData>(
      setValue,
      watchedAllergies,
      watchedChronicConditions,
    );

  return {
    form,
    allergyInput,
    setAllergyInput,
    addAllergy,
    removeAllergy,
    allergies,
    chronicInput,
    setChronicInput,
    addChronic,
    removeChronic,
    chronicConditions,
  };
}

export type PatientFormInstance = ReturnType<typeof usePatientForm>;
