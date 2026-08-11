import { useDoctorRegistrationContext } from "@/contexts/useDoctorRegistrationContext";
import FormFields from "../FormFields";
import type { DoctorRegisterStep2FormData } from "@/schemas/doctor/doctor.schema";
import { DOCTOR_STEP2_INPUTS } from "@/data/doctor.data";

const ClinicInfo = () => {
  const { step2Form } = useDoctorRegistrationContext();

  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = step2Form;

  return (
    <section>
      <h2 className="text-lg font-bold mb-3">Clinic Information</h2>

      <form className="space-y-2">
        <FormFields<DoctorRegisterStep2FormData>
          fields={DOCTOR_STEP2_INPUTS.slice(0, 4)}
          register={register}
          errors={errors}
          control={control}
          setValue={setValue}
        />
      </form>
    </section>
  );
};

export default ClinicInfo;
