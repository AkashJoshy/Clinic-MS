import FormFields from "../FormFields";
import {
  DOCTOR_STEP1_INPUTS,
} from "@/data/doctor.data";
import type {
  DoctorRegisterStep1FormData,
} from "@/schemas/doctor/doctor.schema";
import { useDoctorRegistrationContext } from "@/hooks/useDoctorRegistrationContext";

const BasicInfo = () => {
  const { step1Form } = useDoctorRegistrationContext();

  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = step1Form;

  return (
    <div>
      <h2 className="text-lg font-bold mb-3 text-gray-700">
        Basic Information
      </h2>

      <form className="space-y-2">
        <FormFields<DoctorRegisterStep1FormData>
          fields={DOCTOR_STEP1_INPUTS.slice(0, 5)}
          register={register}
          errors={errors}
          control={control}
          setValue={setValue}
        />
      </form>
    </div>
  );
};

export default BasicInfo;
