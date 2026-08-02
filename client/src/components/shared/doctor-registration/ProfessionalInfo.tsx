import { useDoctorRegistrationContext } from '@/hooks/useDoctorRegistrationContext';
import React from 'react'
import FormFields from '../FormFields';
import type { DoctorRegisterStep1FormData } from '@/schemas/doctor/doctor.schema';
import { DOCTOR_STEP1_INPUTS } from '@/data/doctor.data';

const ProfessionalInfo = () => {
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
        Professional Information
      </h2>

      <form className='space-y-2'>
        <FormFields<DoctorRegisterStep1FormData>
          fields={DOCTOR_STEP1_INPUTS.slice(5, 9)}
          register={register}
          errors={errors}
          control={control}
          setValue={setValue}
        />
      </form>
    </div>
  );
}

export default ProfessionalInfo