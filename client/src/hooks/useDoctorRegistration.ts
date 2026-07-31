import { useState, useRef } from "react";
import { useForm, Watch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { UseFormReturn } from "react-hook-form";
import type { RefObject } from "react";
import type { DoctorRegisterStep1FormData, DoctorRegisterStep2FormData, DoctorRegisterStep3FormData } from "@/schemas/doctor/doctor.schema";
import { doctorRegisterStep1Schema, doctorRegisterStep2Schema, doctorRegisterStep3Schema } from "@/schemas/doctor/register.schema";

export interface UseDoctorRegistrationReturn {
  step: 1 | 2 | 3;
  goNext: (s: number) => Promise<void>;
  goBack: (s: number) => void;
  onSubmit: () => Promise<FormData | void>;
  step1Form: UseFormReturn<DoctorRegisterStep1FormData>;
  step2Form: UseFormReturn<DoctorRegisterStep2FormData>;
  step3Form: UseFormReturn<DoctorRegisterStep3FormData>
}

export function useDoctorRegistration(): UseDoctorRegistrationReturn {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const step1Form = useForm<DoctorRegisterStep1FormData>({
      mode:"onChange",
      resolver: zodResolver(doctorRegisterStep1Schema),
      defaultValues:{
        fullName: "Kakashi",
        email: "kakashi@gmail.com",
        phone: "9554437278",
        bio: "dfgdfdf",
        gender: "Male",
        department: "dept2",
        specialization: "sdsdsdsd",
        qualification: "sdsdsd",
        experienceYears: 4,
        licenceNumber: "dfdf453545",
        password:"12Akashok",
        confirmPassword: "12Akashok"
      }
  })

  const step2Form = useForm<DoctorRegisterStep2FormData>({
      mode:"onChange",
      resolver: zodResolver(doctorRegisterStep2Schema),
      defaultValues:{
        clinicName: "Health Care",
          consultationFee: 250,
          registrationNumber: "rtrt5456456",
          altPhone: "9554437278",
          about: "sfdsfdfdfdf",
          addressLine: "sddzddsdsdsdsdfsfsds dsf sfdfdrfdf",
          country: "",
          state: "",
          city: "",
          pincode: "3545454"
      }
    })

  const step3Form = useForm<DoctorRegisterStep3FormData>({
      mode:"onChange",
      resolver: zodResolver(doctorRegisterStep3Schema)
    })

  const goNext = async (s: number) => {
    if (s === 1) {
      const valid = await step1Form.trigger();
      if (valid) setStep(2);
    } else if (s === 2) {
      const valid = await step2Form.trigger();
      console.log(`Is Valid: ${valid}`)
      console.log(step2Form.getValues());
      if (valid) setStep(3);
    }
  };

  const goBack = (s: number) => {
    if (s === 3) {
      setStep(2);
    } else if (s === 2) {
      setStep(1);
    }
  }

  const onSubmit = async () => {
    const valid = await step3Form.trigger();
    if (!valid) return;
    const payload = {
      ...step1Form.getValues(),
      ...step2Form.getValues(),
      ...step3Form.getValues()
    };

    console.log(`PayLoad: `)
    console.log(payload)
    
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
    step3Form,
  };
}
