// hooks/usePatientForm.ts
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { relativeSchema } from "@/schemas/patient/relative.schema";
import type { RelativeFormData } from "@/schemas/patient/patient.schema";

export function usePatientForm() {
  const [allergyInput, setAllergyInput]   = useState("");
  const [chronicInput, setChronicInput]   = useState("");

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
        pincode: ""
    },
  });

  const { watch, setValue } = form;
  const allergies = watch("allergies") || [];
  const chronicConditions = watch("chronicConditions") || [];

  const addAllergy = (e?: React.FormEvent) => {
    e?.preventDefault();
    const val = allergyInput.trim();
    if (val && !allergies.includes(val)) {
      setValue("allergies", [...allergies, val], { shouldValidate: true });
      setAllergyInput("");
    }
  };

  const removeAllergy = (item: string) =>
    setValue("allergies", allergies.filter((x) => x !== item), { shouldValidate: true });

  const addChronic = (e?: React.FormEvent) => {
    e?.preventDefault();
    const val = chronicInput.trim();
    if (val && !chronicConditions.includes(val)) {
      setValue("chronicConditions", [...chronicConditions, val], { shouldValidate: true });
      setChronicInput("");
    }
  };

  const removeChronic = (item: string) =>
    setValue("chronicConditions", chronicConditions.filter((x) => x !== item), { shouldValidate: true });

  return {
    form,
    allergyInput, setAllergyInput, addAllergy, removeAllergy, allergies,
    chronicInput, setChronicInput, addChronic, removeChronic, chronicConditions,
  };
}

export type PatientFormInstance = ReturnType<typeof usePatientForm>;
