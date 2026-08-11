import { emptyProfile } from "@/constants/patient.constant";
import type { PersonalDetailsForm } from "@/schemas/patient/patient.schema";
import { personalDetailsSchema } from "@/schemas/patient/personalDetails.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMedicalConditions } from "./useMedicalConditions";
import {
  useForm,
  type FieldErrors,
  type UseFormHandleSubmit,
  type UseFormRegister,
  type UseFormReset,
  type UseFormSetValue,
  type UseFormWatch,
} from "react-hook-form";

export interface UsePatientProfileReturn {
  handleSubmit: UseFormHandleSubmit<PersonalDetailsForm>;
  register: UseFormRegister<PersonalDetailsForm>;
  watch: UseFormWatch<PersonalDetailsForm>;
  setValue: UseFormSetValue<PersonalDetailsForm>;
  reset: UseFormReset<PersonalDetailsForm>;
  errors: FieldErrors<PersonalDetailsForm>;
  allergyInput: string;
  setAllergyInput: React.Dispatch<React.SetStateAction<string>>;
  chronicInput: string;
  setChronicInput: React.Dispatch<React.SetStateAction<string>>;
  allergies: string[];
  chronicConditions: string[];
  addAllergy: (e?: React.FormEvent) => void;
  removeAllergy: (item: string) => void;
  addChronic: (e?: React.FormEvent) => void;
  removeChronic: (item: string) => void;
}

export const usePatientProfile = () => {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PersonalDetailsForm>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: emptyProfile,
    mode: "onChange",
  });

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
  } = useMedicalConditions<PersonalDetailsForm>(
    setValue,
    watchedAllergies,
    watchedChronicConditions,
  );

  return {
    handleSubmit,
    register,
    watch,
    setValue,
    reset,
    errors,
    allergyInput,
    setAllergyInput,
    chronicInput,
    setChronicInput,
    allergies,
    chronicConditions,
    addAllergy,
    removeAllergy,
    addChronic,
    removeChronic,
  };
};
