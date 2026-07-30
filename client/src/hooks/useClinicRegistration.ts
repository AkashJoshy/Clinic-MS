import { useState, useRef } from "react";
import { useForm, Watch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  step1Schema,
  step2Schema,
} from "../schemas/clinic/clinical-reg.schema";
import type {
  Step1FormData,
  Step2FormData,
} from "../schemas/admin/admin.schema";
import type { UseFormReturn } from "react-hook-form";
import type { RefObject } from "react";

export interface UseClinicRegistrationReturn {
  step: 1 | 2;
  goNext: () => Promise<void>;
  goBack: () => void;
  onSubmit: () => Promise<FormData | void>;
  step1Form: UseFormReturn<Step1FormData>;
  step2Form: UseFormReturn<Step2FormData>;
  photoInputRef: RefObject<HTMLInputElement | null>;
  handlePhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function useClinicRegistration(): UseClinicRegistrationReturn {
  const [step, setStep] = useState<1 | 2>(1);
  const photoInputRef = useRef<HTMLInputElement | null>(null);

  const step1Form = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    mode: "onChange",
    defaultValues: {
      clinicName: "",
      clinicType: "",
      tagline: "",
      registrationNumber: "",
      about: "",
      departmentIds: [],
      yearEstablished: "2005",
      clinicPhoto: null,
      fullName: "",
      email: "",
      phone: "",
      altPhone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const step2Form = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    mode: "onChange",
    defaultValues: {
      country: "",
      state: "",
      city: "",
      pincode: "",
      addressLine: "",
      latitude: "",
      longitude: "",
      clinicRegistrationDoc: null,
      medicalEstablishmentDoc: null,
      idProofDoc: null,
    },
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    step1Form.setValue("clinicPhoto", file as any, { shouldValidate: true });
  };

  const goNext = async () => {
    const valid = await step1Form.trigger();
    if (valid) setStep(2);
  };

  const goBack = () => setStep(1);

  const onSubmit = async () => {
    const valid = await step2Form.trigger();
    if (!valid) return;
    const payload = {
      ...step1Form.getValues(),
      ...step2Form.getValues(),
    };
    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (value instanceof FileList) {
        formData.append(key, value[0]);
      } else {
        formData.append(key, String(value ?? ""));
      }
    });

    return formData;
  };

  return {
    step,
    goNext,
    goBack,
    onSubmit,
    step1Form,
    step2Form,
    photoInputRef,
    handlePhotoChange,
  };
}
