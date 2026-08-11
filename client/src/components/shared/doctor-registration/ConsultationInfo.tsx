import { useDoctorRegistrationContext } from "@/contexts/useDoctorRegistrationContext";
import FormFields from "../FormFields";
import type { DoctorRegisterStep2FormData } from "@/schemas/doctor/doctor.schema";
import { DOCTOR_STEP2_INPUTS } from "@/data/doctor.data";
import type { DepartmentData } from "@/types/admin";

const ConsultationInfo = (props: { departments: DepartmentData[] }) => {
  const { step2Form } = useDoctorRegistrationContext();

  const {
    register,
    control,
    setValue,
    watch,
    formState: { errors },
  } = step2Form;

  const mode = watch("mode");
  if (mode) {
    DOCTOR_STEP2_INPUTS[13].options = props.departments
      .filter((d) =>
        mode === "BOTH" ? true : d.mode === mode || d.mode === "BOTH",
      )
      .map((d) => {
        return {
          label: d.name,
          value: d.id,
        };
      });
  }

  return (
    <section>
      <h2 className="text-lg font-bold mb-3">Consultation Details</h2>

      <form className="space-y-2">
        <FormFields<DoctorRegisterStep2FormData>
          fields={DOCTOR_STEP2_INPUTS.slice(9)}
          register={register}
          errors={errors}
          control={control}
          setValue={setValue}
        />
      </form>
    </section>
  );
};

export default ConsultationInfo;
