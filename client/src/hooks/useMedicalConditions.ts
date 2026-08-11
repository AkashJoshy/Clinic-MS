import { useState } from "react";
import type {
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
} from "react-hook-form";

export function useMedicalConditions<T extends FieldValues>(
  setValue: UseFormSetValue<T>,
  allergies: string[],
  chronicConditions: string[],
) {
  const [allergyInput, setAllergyInput] = useState("");
  const [chronicInput, setChronicInput] = useState("");

  const addAllergy = (e?: React.FormEvent) => {
    e?.preventDefault();
    const value = allergyInput.trim();
    if (value && !allergies.includes(value)) {
      setValue(
        "allergies" as Path<T>,
        [...allergies, value] as PathValue<T, Path<T>>,
        { shouldValidate: true },
      );
      setAllergyInput("");
    }
  };

  const removeAllergy = (item: string) => {
    setValue(
      "allergies" as Path<T>,
      allergies.filter((x) => x !== item) as PathValue<T, Path<T>>,
      { shouldValidate: true },
    );
  };

  const addChronic = (e?: React.FormEvent) => {
    e?.preventDefault();
    const value = chronicInput.trim();
    if (value && !chronicConditions.includes(value)) {
      setValue(
        "chronicConditions" as Path<T>,
        [...chronicConditions, value] as PathValue<T, Path<T>>,
        {
          shouldValidate: true,
        },
      );
      setChronicInput("");
    }
  };

  const removeChronic = (item: string) => {
    setValue(
      "chronicConditions" as Path<T>,
      chronicConditions.filter((x) => x !== item) as PathValue<T, Path<T>>,
      { shouldValidate: true },
    );
  };

  return {
    allergyInput,
    setAllergyInput,
    allergies,
    addAllergy,
    removeAllergy,
    chronicInput,
    setChronicInput,
    chronicConditions,
    addChronic,
    removeChronic,
  };
}
